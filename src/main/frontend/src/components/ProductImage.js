import React from "react";
import axios from "axios";
import UserStore from "../stores/UserStore";


class ProductImage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            image: null
        };
    }

    componentDidMount() {
        this.loadImage();
    }

    async loadImage() {
        try {
            const token = UserStore.token;
            const imageUrl = "http://zdrowejedzenie.44b0bdc6651241b0874a.eastus.aksapp.io/gateway/images/" + this.props.productId + "/"
            const response = await axios.get(
                imageUrl,
                {
                    "Content-Type": "application/json",
                    headers: {
                        'Authorization': token
                    }
                }
            );
            this.setState({
                ...this.state,
                image: response.data.image,
            });

        } catch (err) {
            console.warn(err);
        }
    }

    render() {
        if (this.state.image == null)
            return (
                <img
                    className="card-img-top"
                    src="http://placehold.it/700x400"
                    alt=""
                />
            )

        const imageSource = "data:image/png;base64," + this.state.image

        return <img className="card-img-top" src={imageSource} alt=""></img>;
    }

}


export default ProductImage