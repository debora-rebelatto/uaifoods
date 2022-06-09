# :fries: UAIFood

A Evnts é uma empresa mineira, cheia de mineiros, então nada melhor que um teste no que fazemos de melhor: comer. Para isto, neste teste, você vai ter que nos ajudar e criar o disruptivo site UaiFood.

## :floppy_disk: Instalação
```
git clone <repo>
cd <folder>
npm i
```

## :electric_plug: Conectando ao MongoDB Atlas
```
touch .env
```
E copie a key disponível [neste docs](https://docs.google.com/document/d/1m45nO_iXQJr_BOM41YzruvdHfLW2OhYaYwQHscx2M3E/edit?usp=sharing) para o arquivo criado na raiz do projeto



## :cd: Inicializando

```
node src/index.js
```
ou, para atualização constante, instale o nodemon
```
npm i -g nodemon
```
e rode o seguinte comando no terminal:
```
nodemon
```

## :mailbox_closed: Postman
[Documentação](https://documenter.getpostman.com/view/9857618/Uz5MDtMV)
Na [pasta do drive](https://drive.google.com/drive/folders/12IlhZd4GfqhpBQvVRDcJNa9aKa01U8mA?usp=sharing), baixe o arquivo json e importe no Postman.


## Requisitos funcionais
1. Cadastrar restaurante
Receber as informações relevantes do restaurante e criar um novo cadastro do mesmo na
base. Verificar se já não existe o mesmo antes de inserir. Além de todos os dados que julgar
pertinente, o restaurante deve ter um tipo de culinária (Árabe, Brasileira, frutos do mar, etc.).

2. Cadastrar item
Dado um restaurante, cadastrar um novo item ao cardápio daquele restaurante. Este item
deve conter toda e qualquer informação pertinente e, obrigatoriamente, um preço.

3. Atualizar item
Dado um restaurante e um item, atualizar o preço e os demais dados para os novos dados
informados.

4. Listar restaurantes
Dado os parâmetros, trazer apenas os restaurantes que tiverem o match com o filtro. Os
parâmetros podem ser:
- Cidade: Recebe uma cidade e retorna os restaurantes cadastrados naquela cidade.
- Tipo de cozinha: recebe o tipo de cozinha e retorna os restaurantes daquele tipo.
- Prato: recebe qualquer coisa que o cliente digitar relacionado aos pratos cadastrados
(ex.: strogonoff) e traz os restaurantes que tiverem itens relacionados.
- [OPCIONAL] Distância: Recebe lat e lng e um raio (em quilômetros) e retorna apenas os
restaurantes dentro da região.
A consulta pode ser feita por um ou mais destes parâmetros e deve trazer a junção de todos.

### Funções básicas
- [x] Cadastrar
- [x] Verificar se restaurante já existe
- [x] Tipo de culinária
- [x] Cadastrar produto
- [x] Atualizar produto
- [x] Atualiza restaurante
- [x] Deleta produto
- [x] Deleta restaurante
- [x] Lista todos os restaurantes
- [x] Listar todos os produtos

### Filtros restaurante
- [ ] Filtro cidade
- [ ] filtro tipo de cozinha
- [ ] Pratos
- [ ] Distância

### Usuário
- [x] Cadastro
- [x] login
