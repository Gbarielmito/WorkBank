from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import json
import os

app = Flask(__name__)
CORS(app)

# Arquivo para armazenar as faturas
FATURAS_FILE = 'faturas.json'

def carregar_faturas():
    if os.path.exists(FATURAS_FILE):
        with open(FATURAS_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def salvar_faturas(faturas):
    with open(FATURAS_FILE, 'w', encoding='utf-8') as f:
        json.dump(faturas, f, ensure_ascii=False, indent=2)

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

if __name__ == '__main__':
    app.run(debug=True) 