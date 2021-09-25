export default alert = (props) => (
    <div className="alert alert-danger text-center" role="alert">
        {props.message}
    </div>
);