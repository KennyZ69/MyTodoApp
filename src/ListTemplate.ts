import FullList from "./FullList";

export interface DOMList {
    div: HTMLDivElement,
    render(fullList: FullList): void,
    clear(): void,
}

export default class ListTemplate implements DOMList{

    div: HTMLDivElement
    static instance: ListTemplate = new ListTemplate();
    private constructor(){
        this.div = document.getElementById('tasks-container') as HTMLDivElement;
    };
    clear(): void {
        this.div.innerHTML = ``;
        this.div.innerHTML += `
        <button id="open-task-form-btn" class="btn large-btn">
        Add New Task
        </button>
        `;
    }

    render(fullList: FullList): void {
        // const editTaskBtn = document.getElementById('editTaskBtn') as HTMLButtonElement;
        // this.clear();
        fullList.list.forEach(item => {
            // this.div.innerHTML = `
            // <div class="task" id="${item.id}">
            // <p><strong>Title:</strong> ${item.title}</p>
            // <p><strong>Date:</strong> ${item.date}</p>
            // <p><strong>Description:</strong> ${item.description}</p>
            // <button onclick="${fullList.editTask(editTaskBtn)}" type="button" class="btn" id="editTaskBtn">Edit</button>
            // <button onclick="${fullList.removeItem(item.id), this.render(fullList)}" type="button" class="btn">Delete</button> 
            // </div>
            // `;

            const taskDiv = document.createElement('div') as HTMLDivElement;
            taskDiv.className = "task";
            taskDiv.id = `${item.id}`;

            const titleLabel = document.createElement('p');
            const dateLabel = document.createElement('p');
            const descLabel = document.createElement('p');
            titleLabel.innerHTML = `<strong>Title:</strong> ${item.title}`;
            dateLabel.innerHTML = `<strong>Date:</strong> ${item.date}`;
            descLabel.innerHTML = `<strong>Description:</strong> ${item.description}`;

            const editTaskBtn = document.createElement('button');
            const removeTaskBtn =document.createElement('button');
            editTaskBtn.textContent = 'Edit';
            removeTaskBtn.textContent = 'Delete';
            // editTaskBtn.onclick!(fullList.editTask(editTaskBtn));
            // removeTaskBtn.onclick!(fullList.removeItem(item.id));
            editTaskBtn.addEventListener('click', (e)=>{
                e.preventDefault();
                fullList.editTask(editTaskBtn);
            })
            removeTaskBtn.addEventListener('click', (e)=>{
                e.preventDefault(); 
                fullList.removeItem(item.id)
                taskDiv.remove();
                // this.render(fullList);
            });
            editTaskBtn.classList.toggle('btn');
            removeTaskBtn.classList.toggle('btn');
            taskDiv.append(titleLabel, dateLabel, descLabel, editTaskBtn, removeTaskBtn);
            this.div.appendChild(taskDiv);
        })
    }
}