import 'antd/dist/reset.css';
import { Card, Button, DatePicker,Col, Row } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Hello from './components/hello';
import Goodbye from './components/Goodbye';
let counter = 0
const onChange: DatePickerProps['onChange'] = (date, dateString) => {
console.log(date, dateString);
};
const onClick = (event: any) => {
console.log(counter++)
}

export default function App() {
  return (
    <div >
    <Hello name="Web API Development"/>
      <>
        <Row  justify="space-around">  
          <Col span={8}>
            <Card title="Card title 1 " bordered={false}
            cover={<img alt="example" src="../img/dog.jpg" />} hoverable
            >
              <Meta title="First Post" description="This is about Dog 1" />
           </Card> 
          </Col>
          <Col span={8}>
            <Card title="Card title 2 " bordered={false}
             cover={<img alt="example" src="../img/dog1.jpeg"/>}       
      hoverable
            >
              <Meta title="First Post" description="This is about Dog 2" />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title 3" bordered={false}
              cover={<img alt="example" src="../img/dog2.jpeg"/>} 
            hoverable
            >
              <Meta title="First Post" description="This is about Dog 3" />
            </Card>
          </Col>
        </Row>
        <Row type="flex" justify="space-around">  
          <Col span={8}>
            <Card title="Card title 4 " bordered={false}
            cover={<img alt="example" src="../img/dog3.jpg" />} hoverable
            >
              <Meta title="First Post" description="This is about Dog 4" />
           </Card> 
          </Col>
          <Col span={8}>
            <Card title="Card title 5 " bordered={false}
             cover={<img alt="example" src="../img/dog4.jpg"/>}       
      hoverable
            >
              <Meta title="First Post" description="This is about Dog 5" />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title 6" bordered={false}
              cover={<img alt="example" src="../img/dog5.jpg"/>} 
            hoverable
            >
              <Meta title="First Post" description="This is about Dog 6" />
            </Card>
          </Col>
        </Row>
      </>
    <br/>
    <Button type="primary" onClick={onClick}>Button</Button>
    <Button type="primary" danger>Button</Button>
    <br/>
      <DatePicker onChange={onChange} />
      <Goodbye name='everyone' />
      </div>
  )
}