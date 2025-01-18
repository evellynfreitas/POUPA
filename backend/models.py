from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), nullable=False, unique=True)
    senha = db.Column(db.String(200), nullable=False)
    nome = db.Column(db.String(200), nullable=False)

class Transacao(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    id_usuario = db.Column(db.Integer, db.ForeignKey('usuario.id'), nullable=False)
    descricao = db.Column(db.String(200), nullable=False)
    valor = db.Column(db.Float, nullable=False)
    tipo_transacao = db.Column(db.String(10), nullable=False)  # 'Entrada' ou 'Saída'
    data = db.Column(db.DateTime, nullable=True)
    categoria = db.Column(db.String(200), nullable=False)
