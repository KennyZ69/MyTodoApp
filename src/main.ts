import './style.css'
import ListItem from './ListItem';
import FullList from './FullList';
import ListTemplate from './ListTemplate';


const taskForm = document.getElementById('task-form') as HTMLFormElement;
const addNewTask = document.getElementById("open-task-form-btn") as HTMLButtonElement;
const addOrUpdateTask = document.getElementById("add-or-update-task-btn") as HTMLButtonElement;

const initApp = (): void =>{

  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const titleInput = document.getElementById('title-input') as HTMLInputElement;
  const dateInput = document.getElementById('date-input') as HTMLInputElement;
  const descInput = document.getElementById('description-input') as HTMLInputElement;


  addOrUpdateTask.addEventListener('click', (e): void =>{
    e.preventDefault();
    // const titleInput = document.getElementById('title-input') as HTMLInputElement;
    const titleValue: string = titleInput.value.trim();
    // const dateInput = document.getElementById('date-input') as HTMLInputElement;
    // const dateValue: string = dateInput.value
    // const descInput = document.getElementById('description-input') as HTMLInputElement;
    if(!titleValue) return

    const itemId = fullList.list.length ? parseInt(fullList.list[fullList.list.length - 1].id) + 1 : 1; 
    const newItem = new ListItem(itemId.toString(), titleInput.value, dateInput.value, descInput.value);

    fullList.addItem(newItem);
    taskForm.classList.toggle("hidden");
    template.render(fullList);
  })

  const closeTask = document.getElementById('close-task-form-btn') as HTMLButtonElement;
  closeTask.addEventListener('click', (e) => {
    e.preventDefault();
    taskForm.classList.toggle('hidden');
    titleInput.value = "";
    dateInput.value = "";
    descInput.value = "";
  })

  addNewTask.addEventListener('click', (e) => {
    e.preventDefault;
    addOrUpdateTask.textContent = "Add Task";
    
    taskForm.classList.toggle("hidden");
})
fullList.load();
template.render(fullList);
}

document.addEventListener('DOMContentLoaded', initApp)