import React, {useState, useEffect} from "react";
import axios from 'axios'; 
import ShoppingItem from './ShoppingItem';
import { Container, Row, Col } from 'react-bootstrap';



function ShopList(){
    const [data, setData] = useState([]);
    const [colorfilter, setcolorFilter] = useState({ colors: []});
    const [filterdata, setfilterdata] = useState(data);

     

    const searchStyle = { border: "black ridge 1px",
    padding: "5px",
    margin: "15px"
    };

    

    useEffect(()=>{
        Loadingdata();
        
    }, [colorfilter]);

    
    const colorfilterhan=  ()=>{
        // console.log(data);
        let r= [];
        if (colorfilter.colors.length !== 0){
        

        console.log(data);    
        for (const i in colorfilter.colors){
            //console.log(data);
            let result = data.filter((d) => d.color ===colorfilter.colors[i]);
            //console.log(result)
            r = [...r, ...result];
            //console.log(r);
            
        }
        console.log(r);
    }else{
        Loadingdata();
    }
    
    };


    const Loadingdata = async () =>{
        await axios.get('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
                                    .then((response)=>setData(response.data))
                                    .catch((err)=>console.log(err));

    };

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
            result = await result.json();
            result= result.filter((d) => d.name.toLowerCase().includes(key.toLowerCase()));
            if(result){
                // console.log(result);
                setData(result);
            }

            }else{
                
            }}

        
    
    const filterColor = (e) => {
        const { value, checked } = e.target;
        const { colors } = colorfilter;
        let r = [];
        if (checked){
                setcolorFilter({
                colors: [...colors, value]
                });
                // console.log(colorfilter);
            
        }else{
            setcolorFilter({colors: colors.filter((e)=> e !==value)});
        }
        // if (colors){
        //     for (const i in colorfilter.colors){
        //         let result = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
        //         result = await result.json();
        //         result = result.filter((d) => d.color === colors[i]);
        //         //console.log(colors[i])
        //         r = [...r, ...result]
        //         setData(r);
        //     }
        // }else{
        //     LoadShopitemData();
        // }
        
        

        //setData(result);
        

        // console.log(checked);
        // if (checked){
        //     let result = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
        //     result = await result.json();
        //     result= result.filter((d) => d.color === value);
        //     console.log(result);
        //     setData(result);
        // } else{
        //     LoadShopitemData();
        // }
    };

    // const genderfilter = async (e) => {
    //     const { value, checked } = e.target;
        
    //     return setgenderFilter([...genderfilter, value]);
    // }    
    
    

   


    return(
        <div>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md="auto" >
                        <input placeholder="Search"  style={searchStyle} size={50} onChange={searchHandle}></input>
                    </Col>
                </Row>
                <Row> 
                    <Col xs={2}>
                        <h5>Color</h5>
                        <input type="checkbox" id="Color1" name="Color1" value="Red" onChange={filterColor}/>
                        <label for="Color1"> Red {colorfilter.colors}</label><br />
                        <input type="checkbox" id="Color2" name="Color2" value="Blue" onChange={filterColor}/>
                        <label for="Color2"> Blue</label><br />
                        <input type="checkbox" id="Color3" name="Color3" value="Black" onChange={filterColor}/>
                        <label for="Color3"> Black</label><br/>
                        <input type="checkbox" id="Color4" name="Color4" value="Green" onChange={filterColor}/>
                        <label for="Color3"> Green</label><br/>
                        <br />
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
                    <Container>
                        <div>
                        <Row>
                            {
                            data.map((item, index)=> (
                                <Col s={6} md={4} key={index}>
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
                                </Col>
                            ))}
                        </Row>
                        </div>

                    </Container>

                </Col>
                </Row>
            </Container>
        </div>
                
         
                 
    )

}


export default ShopList;