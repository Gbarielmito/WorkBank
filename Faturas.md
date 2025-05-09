# WorkBank - Sistema de Faturas

Sistema de gerenciamento de faturas com interface moderna e funcionalidades CRUD.

## Requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/workbank.git
cd workbank
```

2. Crie um ambiente virtual (opcional, mas recomendado):
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

3. Instale as dependências:
```bash
pip install -r requirements.txt
```

## Executando o Projeto

1. Inicie o servidor backend:
```bash
python app.py
```

2. Abra o arquivo `pages/faturas.html` em seu navegador ou use um servidor local.

## Funcionalidades

- Listagem de faturas
- Criação de novas faturas
- Edição de faturas existentes
- Exclusão de faturas
- Filtros por status, data e cliente
- Interface responsiva e moderna

## Tecnologias Utilizadas

- Frontend:
  - HTML5
  - Tailwind CSS
  - JavaScript (Vanilla)

- Backend:
  - Python
  - Flask
  - Flask-CORS

## Estrutura do Projeto

```
workbank/
├── app.py              # Backend Flask
├── requirements.txt    # Dependências Python
├── faturas.json       # Banco de dados (JSON)
├── pages/
│   └── faturas.html   # Página principal
└── css/
    └── dashboard.css  # Estilos adicionais
``` 