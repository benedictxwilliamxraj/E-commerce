import React, {useState, useEffect} from "react";
import axios from 'axios'; 
import ShoppingItem from './ShoppingItem';
import { Container, Row, Col } from 'react-bootstrap';



function ShopList(){
    const [Data, setData] = useState([]);
    const [filterdata, setfilterdata] = useState([]);
    const [colorfilter, setcolorFilter] = useState({ colors: []});
    const [typefilter, settypeFilter] = useState({ types: []});
    const [genderfilter, setgenderFilter] = useState({ genders: []});
     

    const searchStyle = { border: "black ridge 1px",
    padding: "5px",
    margin: "15px"
    };

    

    useEffect(()=>{
        Loadingdata();
        
        filterHandle();
        // typefilterHandle(colordata);

    }, [colorfilter,typefilter,genderfilter]);

    
    const Loadingdata = async () =>{
        await axios.get('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json')
                                    .then((response)=>{
                                        // setfilterdata(response.data);
                                        setData(response.data);
                                        if (filterdata.length === 0){
                                            setfilterdata(response.data);
                                        }
                                        //console.log(response.data);
                                    })
                                    .catch((err)=>console.log(err));
         
    };

    const filterHandle=  ()=>{
        let r= [];
        //console.log(typefilter);
        if ((colorfilter.colors.length !== 0) || (typefilter.types.length!==0)||(genderfilter.genders.length!==0)){
            
        for (const i in colorfilter.colors){
            //console.log(data);
            let result = Data.filter((d) => d.color ===colorfilter.colors[i]);
            //console.log(result)
            r = [...r, ...result];
            
            
        }

        for (const i in typefilter.types){
            console.log(typefilter.types[i]);
            let result = Data.filter((d) => d.type ===typefilter.types[i]);
            //console.log(result)
            r = [...r, ...result];
            
            
        }
        // console.log(genderfilter);
        for (const i in genderfilter.genders){
            console.log(genderfilter.genders[i]);
            let result = Data.filter((d) => d.gender ===genderfilter.genders[i]);
            console.log(result)
            r = [...r, ...result];
            
            
        }

        console.log(r);
        setfilterdata(r);
        //console.log(colorfilterdata);
    }else{
        setfilterdata(Data);
    }
    
    };

    


    

    const searchHandle = async (event)=>{
        let key = event.target.value;
        if(key){
            let result = await fetch('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json');
            result = await result.json();
            result= result.filter((d) => d.name.toLowerCase().includes(key.toLowerCase()));
            if(result){
                setfilterdata(result);
            }

            }else{
                
            }}

        
    
    const filterColor = (e) => {
        const { value, checked } = e.target;
        const { colors } = colorfilter;
        
        if (checked){
                setcolorFilter({
                colors: [...colors, value]
                });
                //console.log(colorfilter);
            
        }else{
            setcolorFilter({colors: colors.filter((e)=> e !==value)});
        }
       
    };

    const filterType = (e) => {
        const { value, checked } = e.target;
        const { types } = typefilter;
    
        if (checked){
                settypeFilter({
                    types: [...types, value]
                });
                // console.log(typefilter);
            
        }else{
            settypeFilter({types: types.filter((e)=> e !==value)});
        }
       
    };

    const filterGender = (e) => {
        const { value, checked } = e.target;
        const { genders } = genderfilter;
    
        if (checked){
                setgenderFilter({
                    genders: [...genders, value]
                });
                // console.log(typefilter);
            
        }else{
            setgenderFilter({genders: genders.filter((e)=> e !==value)});
        }
       
    };

      
    
    

   


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
                        <label for="Color4"> Green</label><br/>
                        <input type="checkbox" id="Color5" name="Color5" value="Grey" onChange={filterColor}/>
                        <label for="Color5"> Grey</label><br/>
                        <br />
                        <br /> 
                        <h5>Gender</h5>
                        <input type="checkbox" id="Gender1" name="Gender1" value="Men" onChange={filterGender}/>
                        <label for="Gender1"> Men</label><br/> 
                        <input type="checkbox" id="Gender2" name="Gender2" value="Women" onChange={filterGender}/>
                        <label for="Gender2"> Women</label><br/> 
                        <br/>
                        <h5>Price</h5>
                        <input type="checkbox" id="Price1" name="Price1" value="250" onChange={filterGender}/>
                        <label for="Price1"> 0- Rs250</label><br/> 
                        <input type="checkbox" id="Price2" name="Price2" value="251" onChange={filterGender}/>
                        <label for="Price2"> Rs250 - Rs450</label><br/> 
                        <input type="checkbox" id="Price3" name="Price3" value="450" onChange={filterGender}/>
                        <label for="Price3"> Rs450</label><br/> 
                        <br/>
                        <h5>Type</h5>
                        <input type="checkbox" id="type1" name="type1" value="Polo" onChange={filterType}/>
                        <label for="type1">Polo</label><br/> 
                        <input type="checkbox" id="type2" name="type2" value="Hoodie" onChange={filterType}/>
                        <label for="type2">Hoodie</label><br/> 
                        <input type="checkbox" id="type3" name="type3" value="Basic" onChange={filterType}/>
                        <label for="type3">Basic</label><br/> 

                    </Col>
                
                <Col>
                    <Container>
                        <div>
                        <Row>
                            {filterdata.map((item, index)=> (
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