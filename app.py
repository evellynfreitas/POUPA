from flask import Flask, render_template, request, redirect, url_for, flash, session
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models import db, Usuario, Transacao
# Inicializando o banco de dados com o app
#app = Flask(__name__, template_folder='app/frontend/src')

app = Flask(__name__, template_folder='backend/templates')
app.secret_key = 'sua_chave_secreta'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///poupa.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializando o banco de dados com o app
db.init_app(app)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        senha = request.form['senha']
        senha_protegida = generate_password_hash(senha, method='scrypt')

        if Usuario.query.filter_by(email=email).first():
            flash('Usuário já existe!', 'danger')
            return redirect(url_for('register'))

        usuario_novo = Usuario(email=email, senha=senha_protegida, nome=nome)
        db.session.add(usuario_novo)
        db.session.commit()

        flash('Cadastro realizado com sucesso!', 'success')
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']
        usuario = Usuario.query.filter_by(email=email).first()

        if usuario and check_password_hash(usuario.senha, senha):
            session['user_id'] = usuario.id
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Credenciais inválidas.', 'danger')

    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('Você saiu da conta.', 'info')
    return redirect(url_for('login'))

@app.route('/')
@app.route('/home')
def home():
    if 'user_id' not in session:
        flash('Por favor, faça login para acessar esta página.', 'warning')
        return redirect(url_for('login'))

    usuario = Usuario.query.filter_by(id=session['user_id']).first()
    
    return render_template('home.html', primeiro_nome = usuario.nome.split(" ")[0])

from datetime import datetime

@app.route('/transaction', methods=['GET', 'POST'])
def transaction():
    if 'user_id' not in session:
        flash('Por favor, faça login para acessar esta página.', 'warning')
        return redirect(url_for('login'))

    if request.method == 'POST':
        descricao = request.form['descricao']
        valor = float(request.form['valor'])
        tipo_transacao = request.form['tipo_transacao']
        categoria = request.form['categoria']
        date = datetime.now()

        trancacao = Transacao(
            descricao=descricao,
            valor=valor,
            tipo_transacao=tipo_transacao,
            date=date,
            categoria=categoria,
            id_usuario=session['user_id']
        )

        db.session.add(trancacao)
        db.session.commit()

        flash('Transação cadastrada com sucesso!', 'success')
        return redirect(url_for('transaction'))

    return render_template('transaction.html')



if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Cria as tabelas no banco de dados
    app.run(debug=True)
