import React from 'react';

const Folders = props => {

    return (
        <div className='folders'>
        <h4>Folders</h4>
            <ul className="subtag-list nav sidebar-nav">
                <li onClick={() => props.setFolder('')}>View All</li>
                {props.folders.map((folder, i) =>
                    <li key={i}
                        onClick={() => props.setFolder(folder)}>
                        {folder}
                    </li>
                )}
            </ul>
        </div>
    )
};

export default Folders;
