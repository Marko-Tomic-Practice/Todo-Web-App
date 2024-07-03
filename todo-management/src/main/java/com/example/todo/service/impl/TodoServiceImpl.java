package com.example.todo.service.impl;

import com.example.todo.dto.TodoDto;
import com.example.todo.entity.Todo;
import com.example.todo.exceptions.ResourceNotFoundException;
import com.example.todo.repository.TodoRepository;
import com.example.todo.service.TodoService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class TodoServiceImpl implements TodoService {

    private TodoRepository todoRepository;

    private ModelMapper modelMapper;
    @Override
    public TodoDto addTodo(TodoDto todoDto) {

        // Convert TodoDto into Todo Jpa entity
        /*
        Todo todo = new Todo();
        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());
        */

        Todo todo = modelMapper.map(todoDto, Todo.class);


        // Todo Jpa entity
        Todo savedTodo = todoRepository.save(todo);

        // Convert savedTodo Jpa entity object into TodoDto object
        /*
        TodoDto savedTodoDto = new TodoDto();
        savedTodoDto.setId(savedTodo.getId());
        savedTodoDto.setTitle(savedTodo.getTitle());
        savedTodoDto.setDescription(savedTodo.getDescription());
        savedTodoDto.setCompleted(savedTodo.isCompleted());
         */

        TodoDto savedTodoDto = modelMapper.map(savedTodo, TodoDto.class);

        return savedTodoDto;
    }

    @Override
    public TodoDto getTodo(Long id) {
       Todo todo = todoRepository.findById(id)
               .orElseThrow(()-> new ResourceNotFoundException("Todo not found with id: "+id));

        return modelMapper.map(todo, TodoDto.class);
    }

    @Override
    public List<TodoDto> getAllTodos() {
        List<Todo> todos= todoRepository.findAll();
        List<TodoDto> todosDto =
                todos.stream()
                        .map((todo) -> modelMapper.map(todo, TodoDto.class))
                                .collect(Collectors.toList());
        return todosDto;
    }

    @Override
    public TodoDto updateTodo(Long id, TodoDto todoDto) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No Todo with that ID"));

        todo.setTitle(todoDto.getTitle());
        todo.setDescription(todoDto.getDescription());
        todo.setCompleted(todoDto.isCompleted());

        todoRepository.save(todo);

        TodoDto updatedTodoDto = modelMapper.map(todo, TodoDto.class);

        return updatedTodoDto;
    }

    @Override
    public void   deleteTodo(Long id) {
        todoRepository.deleteById(id);
    }

    @Override
    public TodoDto completeTodo(Long id) {
        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No Todo with that ID"));

        todo.setCompleted(Boolean.TRUE);
        Todo updatedTodo = todoRepository.save(todo);

        TodoDto todoDto = modelMapper.map(updatedTodo, TodoDto.class);

        return todoDto;
    }

    @Override
    public TodoDto inCompleteTodo(Long id) {

        Todo todo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No Todo with that ID"));

        todo.setCompleted(Boolean.FALSE);

        Todo updatedTodo = todoRepository.save(todo);

        TodoDto todoDto = modelMapper.map(updatedTodo, TodoDto.class);

        return todoDto;
    }
}
