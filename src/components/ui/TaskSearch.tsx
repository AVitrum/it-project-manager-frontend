import { ChangeEvent, useState } from "react";
import { EmployeeResponse } from "../../types/responses";
import "../../assets/search.css"
import { ApiError } from "../../types/others";
import { notifyError } from "./Notify";
import { useAddToTaskMutation } from "../../features/task/addTaskPerformer";

export default function TaskSearch({ data, id }: { data: EmployeeResponse[], id: string }) {
    const [value, setValue] = useState<string>("");

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        onSearch(event.target.value);
    };

    const onSearch = async (searchTerm: string) => {
        setValue(searchTerm);
        console.log(searchTerm)

    };

    const [addTaskPerformer] = useAddToTaskMutation();

    async function onButton() {
        try {
            await addTaskPerformer({ id: id, email: value }).unwrap();
            setTimeout(() => {
                window.location.reload();
            }, 600);
        } catch (err) {
            if (err && typeof err === 'object' && 'status' in err) {
                const error = err as ApiError;
                if (error.status === 400) {
                    if (error.data.errors?.Email?.[0]) {
                        notifyError(error.data.errors.Company[0]);
                    }
                    else {
                        notifyError(error.data.title);
                    }
                } else {
                    notifyError('Server error');
                }
            }
        }
    }

    return (
        <div className="search-container">
            <div className="search-inner">
                <input className="search-container-input" type="text" value={value} onChange={onChange}></input>
            </div>
            <div className="search-dropdown">
                {data.filter(item => {
                    const searchTerm = value?.toLowerCase();
                    const email = item.email.toLowerCase();

                    return searchTerm && email.startsWith(searchTerm) && email !== searchTerm;
                })
                    .map((item) => <div onClick={() => onSearch(item.email)} className="search-dropdown-row">
                        {item.email}
                    </div>)}
            </div>
            <button onClick={onButton}><i className="bi bi-search"></i> Add Employee</button>
        </div>
    );
}
