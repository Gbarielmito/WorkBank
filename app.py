from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from datetime import datetime
import json
import os

app = Flask(__name__, static_folder='.', static_url_path='')
CORS(app)

# Arquivo para armazenar as faturas
FATURAS_FILE = 'faturas.json'
HISTORICO_FILE = 'historico.json'

# Rotas para as páginas HTML
@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/pages/<path:path>')
def serve_page(path):
    return send_from_directory('pages', path)

@app.route('/js/<path:path>')
def serve_js(path):
    return send_from_directory('js', path)

@app.route('/css/<path:path>')
def serve_css(path):
    return send_from_directory('css', path)

def carregar_faturas():
    if os.path.exists(FATURAS_FILE):
        with open(FATURAS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def salvar_faturas(faturas):
    with open(FATURAS_FILE, 'w', encoding='utf-8') as f:
        json.dump(faturas, f, ensure_ascii=False, indent=2)

def carregar_historico():
    if os.path.exists(HISTORICO_FILE):
        with open(HISTORICO_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def salvar_historico(historico):
    with open(HISTORICO_FILE, 'w', encoding='utf-8') as f:
        json.dump(historico, f, ensure_ascii=False, indent=2)

@app.route('/api/faturas', methods=['GET'])
def listar_faturas():
    faturas = carregar_faturas()
    return jsonify(faturas)

@app.route('/api/faturas', methods=['POST'])
def criar_fatura():
    dados = request.json
    faturas = carregar_faturas()
    
    # Gerar novo ID
    novo_id = len(faturas) + 1
    numero_fatura = f"#INV-{novo_id:03d}"
    
    nova_fatura = {
        "id": novo_id,
        "numero": numero_fatura,
        "cliente": dados['cliente'],
        "data": dados['data'],
        "valor": dados['valor'],
        "status": dados['status']
    }
    
    faturas.append(nova_fatura)
    salvar_faturas(faturas)
    
    return jsonify(nova_fatura), 201

@app.route('/api/faturas/<int:id>', methods=['PUT'])
def atualizar_fatura(id):
    dados = request.json
    faturas = carregar_faturas()
    
    for fatura in faturas:
        if fatura['id'] == id:
            fatura['cliente'] = dados['cliente']
            fatura['data'] = dados['data']
            fatura['valor'] = dados['valor']
            fatura['status'] = dados['status']
            
            salvar_faturas(faturas)
            return jsonify(fatura)
    
    return jsonify({"erro": "Fatura não encontrada"}), 404

@app.route('/api/faturas/<int:id>', methods=['DELETE'])
def excluir_fatura(id):
    faturas = carregar_faturas()
    
    for i, fatura in enumerate(faturas):
        if fatura['id'] == id:
            faturas.pop(i)
            salvar_faturas(faturas)
            return jsonify({"mensagem": "Fatura excluída com sucesso"})
    
    return jsonify({"erro": "Fatura não encontrada"}), 404

@app.route('/api/historico', methods=['GET'])
def listar_historico():
    historico = carregar_historico()
    return jsonify(historico)

@app.route('/api/historico', methods=['POST'])
def registrar_historico():
    dados = request.json
    historico = carregar_historico()
    historico.append({
        "tipo": dados['tipo'],  # "deposito" ou "saque"
        "valor": dados['valor'],
        "data": dados['data']    # string com data/hora
    })
    salvar_historico(historico)
    return jsonify({"mensagem": "Histórico registrado com sucesso!"}), 201

if __name__ == '__main__':
    app.run(debug=True) 