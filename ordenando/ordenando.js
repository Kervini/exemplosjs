window.onload = function () {
    document.getElementById("valor").focus();
}

let input = document.getElementById("valor");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        add();
    }
});

add = () => {
    let numero = document.getElementById("valor");

    if (numero && numero.value) {
        let y = document.createElement("li");
        let x = document.createTextNode(document.getElementById("valor").value);
        y.appendChild(x);

        document.getElementById("valores").appendChild(y);

        document.getElementById("valor").value = "";
        document.getElementById("valor").focus();
    } else {
        alert('Digite um número!')
        document.getElementById("valor").focus();
    }
}

addLista = (valor) => {
    let y = document.createElement("li");
    let x = document.createTextNode(valor);
    y.appendChild(x);

    document.getElementById("valores").appendChild(y);
}

preencheArray = () => {
    let listaItems = document.getElementById('valores').getElementsByTagName('li');
    let novoArray = [];

    for (let i = 0; i < listaItems.length; i++) {
        let valor = listaItems[i].innerHTML;
        novoArray.push(eval(valor));
    }

    return novoArray
}

shuffle = () => {
    let lista = preencheArray()

    //Fisher-Yates
    for (let i = lista.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }

    carregaLista(lista)
}

carregaLista = (lista) => {
    const ul = document.getElementById('valores');
    ul.innerHTML = '';

    for (let i = 0; i < lista.length; i++) {
        addLista(lista[i])
    }
}

ordenar = () => {
    let metodo = document.getElementById('metodos').selectedIndex;
    let lista = preencheArray();

    if (metodo == 0) {
        bubble_sort(lista);
    } else if (metodo == 1) {
        selection_sort(lista);
    } else {
        quick_sort(lista, 0, lista.length-1);
    }

    carregaLista(lista);
}

swap = (numeros, x, y) => {
    let temp = numeros[x]
    numeros[x] = numeros[y]
    numeros[y] = temp
}

bubble_sort = (numeros) => {
    for (let i = 0; i < numeros.length; i++) {
        for (let j = 0; j < (numeros.length - i - 1); j++) {
            if (numeros[j] > numeros[j + 1]) {
                [numeros[j], numeros[j + 1]] = [numeros[j + 1], numeros[j]];
            }
        }
    }
}

selection_sort = (numeros) => {
    let menor;
    
    for (let i = 0; i < numeros.length-1; i++) {
        menor = i;
        for (let j = i+1; j < numeros.length; j++) {
            if (numeros[j] < numeros[menor])
                menor = j;
        }
        if (menor != i){
            [numeros[menor], numeros[i]] = [numeros[i], numeros[menor]];
        }
        
    }
}

quick_sort = (numeros, menor, maior) => {
    if (menor < maior) {
        let pi = particionamento(numeros, menor, maior);
        quick_sort(numeros, menor, pi - 1);
        quick_sort(numeros, pi + 1, maior);
    }
}

particionamento = (numeros, menor, maior) => {
    let pivo = numeros[maior];
    let i = menor - 1;
   
    for (let j = menor; j <= maior - 1; j++) {
        if (numeros[j] < pivo) {
            i++;
            [numeros[i], numeros[j]] = [numeros[j], numeros[i]];
        }
    }
   
    [numeros[i + 1], numeros[maior]] = [numeros[maior], numeros[i + 1]];
    return i + 1;
}