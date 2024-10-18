from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'chave-secreta-para-sessao'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///usuarios.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    senha = db.Column(db.String(200), nullable=False)
    objetivo = db.Column(db.String(200), nullable=False)  # Novo campo para o objetivo

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        nome = request.form['nome']
        email = request.form['email']
        senha = request.form['senha']
        objetivo = request.form.get('objetivo')
        senha_hash = generate_password_hash(senha)

        user = Usuario.query.filter_by(email=email).first()
        if user:
            flash('Email já cadastrado. Tente fazer login.')
            return redirect(url_for('login'))

        novo_usuario = Usuario(nome=nome, email=email, senha=senha_hash, objetivo=objetivo)
        db.session.add(novo_usuario)
        db.session.commit()
        flash('Cadastro realizado com sucesso! Faça login.')
        return redirect(url_for('login'))

    return render_template('register.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        senha = request.form['senha']

        user = Usuario.query.filter_by(email=email).first()
        if user and check_password_hash(user.senha, senha):
            session['user_id'] = user.id
            session['user_name'] = user.nome
            session['user_objetivo'] = user.objetivo
            flash('Login realizado com sucesso!')
            return redirect(url_for('dashboard'))
        else:
            flash('Credenciais incorretas. Tente novamente.')
            return redirect(url_for('login'))

    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    if 'user_id' in session:
        return render_template('dashboard.html', nome=session['user_name'], objetivo=session['user_objetivo'])
    else:
        flash('Você precisa estar logado para acessar essa página.')
        return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('user_id', None)
    session.pop('user_name', None)
    session.pop('user_objetivo', None)
    flash('Você saiu da conta.')
    return redirect(url_for('index'))

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
