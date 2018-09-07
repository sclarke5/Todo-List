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

    //get number of compelted todos
    for (var i = 0; i < totalTodos; i++){
      if (this.todos[i].completed === true){
        completedTodos++;
      }
    }
    //Case 1: Everything true, make everything false
    if (completedTodos === totalTodos){
      //make false
      for (var i = 0; i < totalTodos; i++){
        this.todos[i].completed = false;
      }
    //Case 2: Otherwise, make everything true
    } else {
      for (var i =0; i < totalTodos; i++){
        this.todos[i].completed = true;
      }
    }
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
  deleteTodo: function(){
    var deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput");
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = "";
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
    for(var i = 0; i < todoList.todos.length; i++){
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';

      if(todo.completed === true){
          todoTextWithCompletion = '(x) ' + todo.todoText;
      }else{
          todoTextWithCompletion = '( ) ' + todo.todoText;
      }

      todoLi.textContent = todoTextWithCompletion;
      todosUl.appendChild(todoLi);
    }
  }
}




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
