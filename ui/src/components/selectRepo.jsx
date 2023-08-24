import React, { useState, useEffect } from "react";
import { Get, Post } from '../utility/ApiRequest'
import { useQuery, useMutation } from 'react-query';


const fetchRepos = () => Get('/auth/github-repos')
const postRepoSelection = (repoInfo) => {
    return Post('/auth/repo-select', { data: { repoInfo } });
};


export const SelectRepo = (_user) => {
    const user = _user.user;
    const { data: repos, isLoading } = useQuery('repos', fetchRepos);
    const [selected, setSelected] = useState(null)

    const mutation = useMutation(postRepoSelection, {
        onSuccess: () => {
            console.log('webhook setup')
            // toast.success("Webhook setup successful!", {
            //     position: "bottom-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "colored",
            // });
        },
        onError: (error) => {
            console.error("Error setting up webhook:", error);
        }
    });

    const handleSelectChange = (event) => {
        const selectedIndex = event.target.selectedIndex;
        setSelected(repos[selectedIndex]);
    };

    const handleConfirm = () => {
        const repoInfo = JSON.stringify(selected);
        mutation.mutate(repoInfo);
    }

    useEffect(() => {
        if (!isLoading && repos && repos.length > 0) {
            setSelected(repos[0]);
        }
    }, [isLoading, repos]);

    const format = (v) => v == null ? "-" : v
    console.log(user)
    if (isLoading) return <></>

    return (
        <div className='flex flex-col flex-grow h-full gap-4'>
            <div className="alert alert-warning">
                <i class="bi bi-exclamation-triangle text-lg"></i> {"This will configure GitHub to send an event every time a push is made to the selected repository."}
            </div>
            <label>Select a repository to start tracking!</label>
            <select className="select border-custom-highlight2 w-full" onChange={handleSelectChange}>
                {
                    repos.map((repo, i) => {
                        return (
                            <option key={i} value={i}>{repo.name}</option>
                        )
                    })
                }
            </select>
            <div className="divider">Info</div>
            {selected && <div className='flex flex-col gap-4'>
                <div>
                    <b>Name: </b> <a className="link" rel="noreferrer" target="_blank" href={selected.html_url}>{format(selected.name)}</a>
                </div>
                <div>
                    <b>Language: </b> {format(selected.language)}
                </div>
                <div>
                    <b>Description: </b> {format(selected.description)}
                </div>
            </div>}
            <div className=" mt-auto group relative w-full" onClick={handleConfirm}>
                <button disabled={mutation.isLoading} className="btn w-full border-2 rounded-none bg-transparent hover:text-white transition-all duration-300 ease-in-out text-custom-highlight2 border-custom-highlight2 hover:border-custom-highlight2 hover:bg-custom-highlight2">Confirm</button>
                {/* <button
                    className={` w-full styled-button px-4 py-1 relative overflow-hidden border-2 hover:text-white transition-all duration-300 ease-in-out text-custom-highlight2 border-custom-highlight2 hover:bg-custom-highlight2`}
                >
                    Confirm
                    <span className={`absolute inset-0 transform -skew-x-12 -skew-y-12 bg-custom-highlight2 scale-x-0 group-hover:scale-x-100 transition-transform`}></span>
                </button> */}
            </div>
        </div>
    )
}