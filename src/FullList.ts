import ListItem from "./ListItem";

export interface List {
    list: ListItem[],
    load(): void,
    save(): void,
    // clear(): void,
    // openNewTask(buttonEL: HTMLButtonElement): void,
    addItem(itemObj: ListItem): void,
    editTask(buttonEL: HTMLButtonElement): any,
    // updateItem(): void,
    removeItem(id: any): any,
}

export default class FullList implements List{
    
    static instance: FullList = new FullList();
    constructor(
        private _list: ListItem[] = [],
    ){}

    get list(): ListItem[]{
        return this._list
    }

    load(): void{
        const storedData: string | null = localStorage.getItem('myList');
        if (typeof storedData !== 'string') return 
        const parsedData: {_id: any, _title: string, _date: string, _description: string}[] = JSON.parse(storedData);

        parsedData.forEach(itemObj => {
            const newListItem = new ListItem(itemObj._id, itemObj._title, itemObj._date, itemObj._description);
            FullList.instance.addItem(newListItem);
        })
    }

    save(): void{
        localStorage.setItem('myList', JSON.stringify(this._list))
    }

    // clear(): void{}
    addItem(itemObj: ListItem): void{

        this._list.unshift(itemObj);
        this.save();
    }

    // openNewTask(buttonEL: HTMLButtonElement): void {
    //     const addNewTask = document.getElementById('') as HTMLButtonElement;
    // }

    removeItem(id: any): any {
        this._list = this._list.filter(item => item.id !== id);
        this.save();
    }

    editTask(buttonEL: HTMLButtonElement): any {
        const dataIndex: number= this._list.findIndex(item => item.id === buttonEL.parentElement!.id);
        const currentTask: ListItem = this._list[dataIndex];
        
        const titleInput = document.getElementById('title-input') as HTMLInputElement;
        titleInput.value = currentTask.title;
        const dateInput = document.getElementById('date-input') as HTMLInputElement;
        dateInput.value = currentTask.date;
        const descriptionInput = document.getElementById("description-input") as HTMLInputElement;
        descriptionInput.value = currentTask.description;
        document.getElementById('task-form')!.classList.toggle('hidden');
        document.getElementById('add-or-update-task-btn')!.innerText = "Update Task"
    }
}