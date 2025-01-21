import jwt
from datetime import datetime, timedelta
from flask import Flask, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from backend.models import Sessao, db, Usuario, Transacao
from flask_cors import CORS

# Cria instância do servidor
app = Flask(__name__)
cors = CORS(app)

app.config['SECRET_KEY'] = 'sua_chave_secreta'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///poupa.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializando o banco de dados com o app
db.init_app(app)

@app.route('/register', methods=['POST'])
def register():
    dados = request.get_json()

    nome = dados.get('nome')
    email = dados.get('email')
    senha = dados.get('senha')

    if not nome or not email or not senha:
        return jsonify({'message': 'Campos nome, email e senha são obrigatórios!'}), 400

    senha_protegida = generate_password_hash(senha, method='scrypt')

    if Usuario.query.filter_by(email=email).first():
        return jsonify({'message': 'Usuário já existe!'}), 409

    usuario_novo = Usuario(email=email, senha=senha_protegida, nome=nome)
    db.session.add(usuario_novo)
    db.session.commit()

    return jsonify({'message': 'Cadastro realizado com sucesso!'}), 201

@app.route('/login', methods=['POST'])
def login():
    dados = request.get_json()

    email = dados.get('email')
    senha = dados.get('senha')

    if not email or not senha:
        return jsonify({'message': 'Campos email e senha são obrigatórios!'}), 400

    usuario = Usuario.query.filter_by(email=email).first()

    if not usuario or not check_password_hash(usuario.senha, senha):
        return jsonify({'message': 'E-mail ou senha inválidos!'}), 401

    token = criar_token_acesso(usuario.id)

    sessao = Sessao(
        token=token,
        expirado_em=datetime.utcnow() + timedelta(hours=1),
        id_usuario=usuario.id
    )
    db.session.add(sessao)
    db.session.commit()

    return jsonify({'message': 'Autenticação realizada com sucesso!', 'token': token}), 200

def criar_token_acesso(id_usuario):
    payload = {
        'id_usuario': id_usuario,
        'exp': datetime.utcnow() + timedelta(hours=1)  # Validade de 1 hora
    }
    token = jwt.encode(payload, app.config['SECRET_KEY'], algorithm='HS256')
    return token

@app.route('/logout', methods=['POST'])
def logout():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'message': 'Token não fornecido!'}), 401

    try:
        token = token.replace('Bearer ', '')

        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        usuario_id = decoded_token['id_usuario']

        sessao = Sessao.query.filter_by(token=token, id_usuario=usuario_id).first()

        if not sessao:
            return jsonify({'message': 'Sessão não encontrada!'}), 404

        db.session.delete(sessao)
        db.session.commit()

        return jsonify({'message': 'Logout realizado com sucesso!'}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expirado!'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Token inválido!'}), 401

@app.route('/verify', methods=['GET'])
def verificar_sessao():
    token = request.headers.get('Authorization')

    if not token:
        return jsonify({'message': 'Token não fornecido!'}), 401

    try:
        token = token.replace('Bearer ', '')

        decoded_token = jwt.decode(token, app.config['SECRET_KEY'], algorithms=['HS256'])
        usuario_id = decoded_token['id_usuario']

        sessao = Sessao.query.filter_by(token=token, id_usuario=usuario_id).first()

        if not sessao or sessao.expirado_em < datetime.utcnow():
            return jsonify({'message': 'Sessão inválida ou expirada!'}), 401
        
        return jsonify({'message': 'Sessão válida!'}), 200

    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expirado!'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Token inválido!'}), 401

@app.route('/transaction', methods=['GET', 'POST'])
def transaction():
    if request.method == 'POST':
        try:
            dados = request.get_json()

            descricao = dados.get('descricao')
            valor = dados.get('valor')
            tipo_transacao = dados.get('tipo_transacao')
            categoria = dados.get('categoria')
            id_usuario = dados.get('id_usuario')

            if not descricao or not valor or not tipo_transacao or not categoria or not id_usuario:
                return jsonify({'message': 'Todos os campos são obrigatórios!'}), 400

            try:
                valor = float(valor)
            except ValueError:
                return jsonify({'message': 'O campo valor deve ser um número válido!'}), 400

            try:
                id_usuario = int(id_usuario)
            except ValueError:
                return jsonify({'message': 'O campo id_usuario deve ser um número inteiro válido!'}), 400

            transacao = Transacao(
                descricao=descricao,
                valor=valor,
                tipo_transacao=tipo_transacao,
                categoria=categoria,
                id_usuario=id_usuario
            )

            db.session.add(transacao)
            db.session.commit()

            return jsonify({'message': 'Transação cadastrada com sucesso!'}), 200

        except Exception as e:
            return jsonify({'message': f'Ocorreu um erro: {str(e)}'}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
