import axios from 'axios'; 
import { useEffect, useState } from 'react';
import ShoppingItem from './ShoppingItem';
import { Container, Row, Col } from 'react-bootstrap';



function ShoppingList(){
    const [rawitems, setrawitems] = useState([]);
    const [query, setQuery] = useState("");
    const [filteritems, setFilteritems] = useState([]);

    const searchStyle = { border: "black ridge 1px",
    padding: "5px",
    margin: "15px"
    };


    
  useEffect(()=>{
    async function fetchItems() {
    const rawData = await axios.get('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
    // console.log(rawData.data);
    setrawitems(rawData.data);
    }
    fetchItems();
  });

  const handleCheckColor = (Color) =>{
    
    if (Color === 'Red'){
      const colorfilter = rawitems.filter(res => res.color.toLowerCase() === 'Red');
      setFilteritems(...filteritems)
      //return [...filteritems, ...colorfilter];
    } else if (Color === 'Blue'){
      const colorfilter = rawitems.filter(res => res.color.toLowerCase() === 'blue');
      return [...filteritems, ...colorfilter];
    }else if (Color === 'Black'){
      const colorfilter = rawitems.filter(res => res.color.toLowerCase() === 'black');
      return [...filteritems, ...colorfilter];
    }else if (Color === 'Green'){
      const colorfilter = rawitems.filter(res => res.color.toLowerCase() === 'green');
      return [...filteritems, ...colorfilter];
    // }

  };
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
                  <Col md="auto" >
                    <input placeholder="Search"  style={searchStyle} size={50} onChange={e => setQuery(e.target.value)}></input>
                  </Col>
          </Row>
        <Row>
          <Col xs={2}>
              <h5>Color</h5>
              <input type="checkbox" id="Color1" name="Color1" value="Red" onChange={() => setFilteritems(handleCheckColor('Red'))}/>
              <label for="Color1"> Red</label><br />
              <input type="checkbox" id="Color2" name="Color2" value="Blue" onChange={() => setFilteritems(handleCheckColor('Blue'))}/>
              <label for="Color2"> Blue</label><br />
              <input type="checkbox" id="Color3" name="Color3" value="Black" onChange={() => setFilteritems(handleCheckColor('Black'))}/>
              <label for="Color3"> Black</label><br/>
              <input type="checkbox" id="Color4" name="Color4" value="Green" onChange={() => setFilteritems(handleCheckColor('Green'))}/>
              <label for="Color3"> Green</label><br/>
              <br />
              <h5>Gender</h5>
              <input type="checkbox" id="Gender1" name="Gender1" value="Male"/>
              <label for="Gender1"> Male</label><br/> 
              <input type="checkbox" id="Gender2" name="Gender2" value="Female"/>
              <label for="Gender2"> Female</label><br/> 
              <br/>
              <h5>Price</h5>
              <input type="checkbox" id="Price1" name="Price1" value="250" />
              <label for="Price1"> 0- Rs250</label><br/> 
              <input type="checkbox" id="Price2" name="Price2" value="251" />
              <label for="Price2"> Rs250 - Rs450</label><br/> 
              <input type="checkbox" id="Price3" name="Price3" value="450" />
              <label for="Price3"> Rs450</label><br/> 
              <br/>
              <h5>Type</h5>
              <input type="checkbox" id="type1" name="type1" value="Polo" />
              <label for="type1">Polo</label><br/> 
              <input type="checkbox" id="type2" name="type2" value="Hoodie" />
              <label for="type2">Hoodie</label><br/> 
              <input type="checkbox" id="type3" name="type3" value="Basic" />
              <label for="type3">Basic</label><br/> 

          </Col>
          <Col>
            <div>
              
              <Container>
              
                <Row>
                    {rawitems.filter((item)=>{
                      if(query === ''){
                        return item;
                      } else if (item.name.toLowerCase().includes(query.toLowerCase())){
                        return item;
                      }}).map((item, index)=>(

                        <Col s={6} md={4}>
                            <div key={index}>
                                <ShoppingItem 
                                key = {item.id}
                                image = {item.imageURL} 
                                name = {item.name} 
                                type = {item.type}
                                price = {item.price}
                                currency = {item.currency}
                                color = {item.color}
                                gender = {item.gender}
                                quantity = {item.quantity}
                                />
                                
                            </div>
                        </Col>
        ))}
                    
                </Row>
                </Container>
                </div>
              
              </Col>
          </Row>
        </Container>
    </div>

)}

export default ShoppingList;