function Header({ title }) {

    const today = new Date();

    const formattedDate = today.toLocaleDateString("en-IN", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (

        <div
            className="d-flex justify-content-between align-items-center mb-4"
        >

            <div>

                <h2 className="fw-bold mb-1">
                    {title}
                </h2>

                <small className="text-muted">
                    Corporate Treasury Management System
                </small>

            </div>

            <div className="text-end">

                <h5 className="mb-1">
                    👋 Welcome
                </h5>

                <small className="text-muted">
                    {formattedDate}
                </small>

            </div>

        </div>

    );

}

export default Header;