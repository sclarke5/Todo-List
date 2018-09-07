var todoList = {
  todos: [],
  displayTodos: function(){
    if(this.todos.length === 0){
      console.log('Empty list!');
    } else {
      console.log('My Todos:');
      for(var i = 0; i < this.todos.length; i++){
        if(this.todos[i].completed === true){
          console.log('(x)', this.todos[i].todoText);
        } else {
          console.log('( )', this.todos[i].todoText);
        }
      }
    }
  },
  addTodo: function(todoText){
    this.todos.push({
      todoText: todoText,
      completed: false
    });
    this.displayTodos();
  },
  changeTodo: function(position, todoText){
    // this.todos[position] = todoText;
    this.todos[position].todoText = todoText;
    this.displayTodos();
  },
  deleteTodo: function(position){
    this.todos.splice(position, 1);
    this.displayTodos();
  },
  toggleCompleted: function(position){
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    this.displayTodos();
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
    this.displayTodos();
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
  displayTodos: function(){
    todoList.displayTodos();
  },
  toggleAll: function(){
    todoList.toggleAll();
  },
  addTodo: function(){
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
  },
  changeTodo: function(){
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
  },
  deleteTodo: function(){
    var deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput");
    todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    deleteTodoPositionInput.value = "";
  },
  toggleCompleted: function(){
    var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
  }
};




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
