import React from "react";

const AddService = () => {
    return (
        <>
            <form action="" method="post">
                <div class="service">
                    <h1>Add a product or Service</h1>
                    <p>Please fill in this form to dd a product or list a service.</p>

                    <label for="email">
                        <b>Title</b>
                    </label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Enter the name of the service or product"
                        required
                    />
                    <label for="desc">
                        <b>Description</b>
                    </label>
                    <textarea name="desc" id="desc" cols="30" rows="5">
                        Write a description of the product or service here
                    </textarea>

                    <label for="category">
                        <b>Category</b>
                    </label>
                    <input type="text" placeholder="category" name="category" required />

                    <label for="image">
                        <b>Image</b>
                    </label>
                    <br />
                    <input type="image" name="image" required />
                    <p>
                        By adding you agree to our{" "}
                        <a href="#" style={{ color: "dodgerblue" }}>
                            Terms & Privacy .
                        </a>
                    </p>

                    <div class="clearfix">
                        <button type="submit" class="btn">
                            Add
                        </button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AddService;
