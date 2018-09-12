var todoList = {
  todos: [],
  //OLDER VERSION--no longer using console; also deleted this function call from all other functions
  // displayTodos: function(){
  //   if(this.todos.length === 0){
  //     console.log('Empty list!');
  //   } else {
  //     console.log('My Todos:');
  //     for(var i = 0; i < this.todos.length; i++){
  //       if(this.todos[i].completed === true){
  //         console.log('(x)', this.todos[i].todoText);
  //       } else {
  //         console.log('( )', this.todos[i].todoText);
  //       }
  //     }
  //   }
  // },
  addTodo: function(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  changeTodo: function(position, todoText){
    // this.todos[position] = todoText;
    this.todos[position].todoText = todoText;
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
  },
  toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  toggleAll: function(){
    var totalTodos = this.todos.length;
    var completedTodos = 0;

    //get number of compeleted todos

    //OLDER VERSION -- ORIGINAL FOR LOOPS

    // for (var i = 0; i < totalTodos; i++){
    //   if (this.todos[i].completed === true){
    //     completedTodos++;
    //   }
    // }

    this.todos.forEach(function(todo){
      if(todo.completed === true){
        completedTodos++;
      }
    });

    //Case 1: Everything true, make everything false

    // if (completedTodos === totalTodos){
    //   //OLDER VERSION -- FORLOOPS
    //   // for (var i = 0; i < totalTodos; i++){
    //   //   this.todos[i].completed = false;
    //   // }
    //  // INTERMEDIATE VERSION--MESSY
    // this.todos.forEach(function(todo){
    //   todo.completed = false;
    // })

    // //Case 2: Otherwise, make everything true
    // } else {
    //   //OLDER--FORLOOPS
    //   // for (var i =0; i < totalTodos; i++){
    //   //   this.todos[i].completed = true;
    //   // }
    //  // INTERMEDIATE VERSION--MESSY
    //   this.todos.forEach(function(todo) {
    //     todo.completed = true;
    //   });
    // }

    //FINAL, CLEANEST VERSION--FOR EACH OUTSIDE IF/ELSE CONDITIONS

    this.todos.forEach(function(todo){
      if(completedTodos === totalTodos){
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    })

  }
};

  //Older version; more explicit before refactoring

    //Access to display todos button
// var displayTodosButton = document.getElementById('displayTodosButton');
// var toggleAllButton = document.getElementById('toggleAllButton');
//
    // //run displayTodos method when said button is clicked
// displayTodosButton.addEventListener('click', function(){
//   todoList.displayTodos();
// });
// toggleAllButton.addEventListener('click', function(){
//   todoList.toggleAll();
// });

var handlers = {
  toggleAll: function(){
    todoList.toggleAll();
    view.displayTodos();
  },
  addTodo: function(){
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function(){
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position){
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function(){
    var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
  }
};

var view = {
  displayTodos: function(){
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';

    // OLDER VERSION--FOR LOOP REPLACED BY FOREACH

    // for(var i = 0; i < todoList.todos.length; i++){
    //   var todoLi = document.createElement('li');
    //   var todo = todoList.todos[i];
    //   var todoTextWithCompletion = '';
    //
    //   if(todo.completed === true){
    //       todoTextWithCompletion = '(X) ' + todo.todoText;
    //   }else{
    //       todoTextWithCompletion = '( ) ' + todo.todoText;
    //   }
    //
    //   todoLi.id = i;
    //   todoLi.textContent = todoTextWithCompletion;
    //   todoLi.appendChild(this.createDeleteButton());
    //   todosUl.appendChild(todoLi);
    // }
    todoList.todos.forEach(function(todo, position){
      var todoLi = document.createElement('li');
      var todoTextWithCompletion = '';

        if(todo.completed === true){
            todoTextWithCompletion = '(X) ' + todo.todoText;
        }else{
            todoTextWithCompletion = '( ) ' + todo.todoText;
        }

      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton()); //will not work--this no longer refers to view object while inside callback
      todosUl.appendChild(todoLi);
    }, this); //fixes above problem using forEach's optional 'this' argument
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';
    return deleteButton;
  },
  setEventListeners: function(){
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click', function(event){
      //demonstration purposes -- using parentNode
      console.log(event.target.parentNode.id);
      // Get the clicked element
      var elementClicked = event.target;
      //check if element clicked is delete button
      if(elementClicked.className === 'deleteButton'){
        handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
      }
    });
    var addInput = document.getElementById("addTodoTextInput");
    addInput.addEventListener('keypress', function(keyPressed){
      if(keyPressed.keyCode === 13){
        handlers.addTodo();
      }
    });
    var changeInput = document.getElementById("changeTodoTextInput");
    changeInput.addEventListener('keypress', function(keyPressed){
      if(keyPressed.keyCode === 13){
        handlers.changeTodo();
      }
    });
  }
};

view.setEventListeners();


todoList.addTodo('hunting');
todoList.addTodo('thing 2');
// todoList.addTodo('thing 3');
// todoList.addTodo('number 4');
// todoList.changeTodo(0, 'nevermind');
// todoList.toggleCompleted(0);
// todoList.toggleCompleted(0);
//
// todoList.toggleCompleted(1);
//
// todoList.toggleAll();
// todoList.toggleAll();
