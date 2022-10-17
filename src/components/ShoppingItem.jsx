import { Card, Button } from 'react-bootstrap';

function ShoppingItem(props){

    return ( 

        <div>
            <Card key={props.id} style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.image} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text style={{fontWeight:'bold'}}>
                    {props.price}{props.currency}
                </Card.Text>
                <Button variant="primary">Add to Cart</Button>
            </Card.Body>
            </Card>
        </div>
    )
}

export default ShoppingItem;