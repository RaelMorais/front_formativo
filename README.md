# Projeto Formativo/Integrador Front End 

Projeto desenvolvido na matéria de frontend junto com backend no Senai Roberto Mange, cuja finalidade é o desenvolvimento 
de um sistema de gerenciamento escolar, capaz de realizar todas operações como Criar, Atualizar, Visualizar e Deletar: Usuarios, Reservas, Salas, Disciplinas, além de armazenar as informações em um banco de dados. 


# 🎯Como iniciar? 


Clone o projeto para sua pasta usando: 

```git clone https://github.com/RaelMorais/projeto_educar_front.git```

Depois instale as dependencia com

```npm install```

E então rode o projeto com

```npm run dev```

Acesse: Local:  http://localhost:5173/

# 🛠️ Backend 

Todo backend do projeto foi desenvolvido em Python, usando o DRF (Django Rest FrameWork), onde os endpoints são separados por funções necessarias para realizar operações, e usa o Token JWT para autenticação. 

# 🤔 Como iniciar o backend 

Use: 

```git clone https://github.com/RaelMorais/projeto_educar_back.git```

Depois crie a venv: 

```python -m venv .env```

Em setting.py coloque a senha do seu úsuario do WorkBench em DATABASES: 

```python 

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'formativo_dorival',
        'USER': '#', # Usuario Workbench 
        'PASSWORD': '#', # Senha Workbench 
        'HOST': 'localhost',  # Mysql IP
        'PORT': '3306',  # Porta Mysql      
    }
}

```

⚠️ Importante: O banco formativo deve existir no MySQL. Você pode criá-lo manualmente no MySQL Workbench com:

````mysql  
    DROP DATABASE IF EXISTS formativo;
    CREATE DATABASE formativo;
    USE formativo;
````

Agora será necessário aplicar as migrações: 

1°: python manage.py makemigrations

2°: pythpn manage.py migrate

3°: python manage.py createsuperuser e defina o cargo como 'D'

Então rode o projeto: 

python manage.py runserver

Para maiores dúvidas, [link do projeto aqui](https://github.com/RaelMorais/projeto_educar_back.git).

