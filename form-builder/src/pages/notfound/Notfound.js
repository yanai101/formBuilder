import React from 'react';
import {Link} from 'react-router-dom';
import './404.scss';

export default function Notfound(){

    return(
        <div className="notFound">
            <Link to="/">Dude, I think you're lost... go home?</Link>
        </div>
    )
}
