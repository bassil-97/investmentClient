import moment from 'moment';

const clock = () => {
    return(
        <div className="time">
            <small>{moment().format('MMMM Do YYYY, h:mm A')}</small>
        </div>
    );
};

export default clock;