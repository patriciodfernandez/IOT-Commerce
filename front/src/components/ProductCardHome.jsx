import React from 'react'
import {createUseStyles} from 'react-jss'
import Rating from 'react-rating'
import {Link} from 'react-router-dom'
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const useStyles = createUseStyles({
    menuItem: {
        flexGrow: 1,
        display: "flex",
        maxWidth: "10rem",
        height: 230,
        marginRight: "8rem",
        marginLeft: "-5rem",

    },
    link:{
        flexGrow: 1,
        display: "flex",
        flexFlow: "column",
        textDecoration: "none",
        '&:hover': {
                textDecoration: "none"
            }       
    },
    name: {
        fontSize: ".9rem",
        whiteSpace: "normal",
        fontWeigth: "bold",
        color: "#0046be",
        height: "100%",
        maxHeight: "3rem"
        
    },
    contImg:{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        marginBottom: ".2rem"
    },
    img:{
        width: "100%",
        maxWidth: "8rem",
        height: "auto",
        
    },
    price:{
        textDecoration: "none",
        color: "black",
        fontWeigth: "900",
    }, 
    rating:{
        marginBottom: ".5rem"
    },
    iconFull: {
        color: "#ffc107"
    },
    iconEmpty: {
        color: "#cfcfcf"
    }

  })


const ProductCardHome = ({name, id, price, img, rating=0}) => {
    const classes = useStyles()
    return (
        <div className={classes.menuItem}>
            <Link to={`/products/${id}`} className={classes.link}>
            <div className={classes.contImg}>
                <img src={img} alt={name} title={name} className={classes.img}/>
            </div>
            <h5 className={classes.name}>{name}</h5>
            <Rating 
                className={classes.rating}
                readonly 
                initialRating={rating}
                emptySymbol={<FaRegStar className={classes.iconEmpty}/>}
                fullSymbol={<FaStar className={classes.iconFull}/>}
                fractions={2}
            />
            <p className={classes.price}>{price}</p>
            </Link>
        </div>
    )
}

export default ProductCardHome
