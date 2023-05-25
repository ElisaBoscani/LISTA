const matita = document.querySelector(".matita");
const input = document.querySelector(".input");
const ok = document.querySelector(".ok");
const lista = document.querySelector(".lista");
const elimina = document.querySelector(".elimina");
const edit = document.querySelector(".edit");

const mostraNascondiInput = () => {
  if (input.style.display === "none") {
    input.style.display = "flex";
  } else {
    input.style.display = "none";
  }
};

matita.addEventListener("click", () => {
  mostraNascondiInput();
});

let arrayLista = [];

const findCurrentIndex = (data) => {
  let currentIndex;

  data.forEach((el, index) => {
    if (el.selezionato) {
      currentIndex = index;
    }
  });
  return currentIndex;
};

const aggiungiToDo = () => {
  const todo = { nome: input.value, selezionato: false };
  arrayLista.push(todo);
  input.value = "";

  console.log("aggiungiTodo", arrayLista);
};

ok.addEventListener("click", () => {
  if (input.value !== "") {
    aggiungiToDo();
    mostraLista();
  }
  editTodo();
});

const mostraLista = () => {
  lista.innerHTML = "";

  if (arrayLista.length > 0) {
    arrayLista.forEach((toDo, index) => {
      const todoContainer = document.createElement("div");
      todoContainer.className = "todoContainer";

      const todo = document.createElement("p");
      todo.className = "todo";
      todo.innerHTML = toDo.nome;

      const checkbox = document.createElement("input");
      checkbox.className = "checkbox";
      checkbox.type = "checkbox";

      const editInput = document.createElement("input");
      editInput.style.display = "none";

      checkbox.addEventListener("click", () => {
        selezionaTodo(index);
      });

      todoContainer.appendChild(checkbox);
      todoContainer.appendChild(todo);
      todoContainer.appendChild(editInput);
      lista.appendChild(todoContainer);
    });
  }
};

const selezionaTodo = (id) => {
  let listaAggiornata;
  listaAggiornata = arrayLista.map((todo, index) => {
    if (index === id) {
      return { ...todo, selezionato: !todo.selezionato };
    } else {
      return todo;
    }
  });
  arrayLista = listaAggiornata;

  console.log("listaAggiornata", listaAggiornata);
};

elimina.addEventListener("click", () => {
  eliminaElemento();
  mostraLista();
});

const eliminaElemento = () => {
  let listaAggiornata = arrayLista.filter((todo) => todo.selezionato === false);
  arrayLista = listaAggiornata;
  console.log("listaAggiornata", arrayLista);
};

edit.addEventListener("click", () => {
  mostraEditInput();
});

const mostraEditInput = () => {
  const todoTrue = arrayLista.find((todo) => todo.selezionato === true);
  if (todoTrue) {
    const tuttiTodo = document.querySelectorAll(".todoContainer");
    const tuttiTodo2 = Array.from(tuttiTodo);

    const todoSelezionato = tuttiTodo2.find(
      (_todo, index) => index === findCurrentIndex(arrayLista)
    );
    const text = todoSelezionato?.children[1];
    const input = todoSelezionato?.children[2];

    if (text?.style.display !== "none") {
      text.style.display = "none";
      input.style.display = "flex";
    } else {
      text.style.display = "flex";
      input.style.display = "none";
    }
  }
};

const editTodo = () => {
  console.log("editTodeo invocata");
  const todoTrue = arrayLista.find((todo) => todo.selezionato === true);
  if (todoTrue) {
    const tuttiTodo = document.querySelectorAll(".todoContainer");
    const tuttiTodo2 = Array.from(tuttiTodo);

    const todoSelezionato = tuttiTodo2.find(
      (_todo, index) => index === findCurrentIndex(arrayLista)
    );

    const input = todoSelezionato?.children[2];
    const text = todoSelezionato?.children[1];

    const listaAggiornata = arrayLista.map((todo, index) => {
      if (index === findCurrentIndex(arrayLista)) {
        return { nome: input.value, selezionato: false };
      } else {
        return todo;
      }
    });
    arrayLista = listaAggiornata;
    console.log("arrayLista", arrayLista);
    input.value = "";

    text.style.display = "flex";
    input.style.display = "none";
    mostraLista();
  }
};
