import { useState } from 'react';
import { Edit } from 'img/Edit';
import {
  Container,
  SearchContainer,
  SearchBlock,
  Input,
  Button,
  // Field,
  // Field2,
  // Product,
  // Wrapper,
  Card,
  Table,
  Th1,
  Th2,
  Th,
  Td,
  ButtonsGroup,
  PaymentDiv,
  EditBtnBlock,
  TaskText,
  Coment,
  OrderWrapper,
  CheckListWrapper,
  Label,
  Form,
  Checkbox,
} from './CheckList.styled';
import { Delete } from 'img/Delete';
// import { Modal } from 'components/Modal/Modal';

export const CheckList = () => {
  const initialTasks = [
    'Создаем бюджет',
    'Согласовываем с бух / ФО график платежей',
    'Согласовываем с Юлей расходы - логистика, таможня, ВЭД, брокер',
    'Проводим бюджет',
    'Размещаем заказ',
    'Получаем PI',
    'Проверяем PI, отправляем Юля для составления спецификации',
    'Проверяем спецификацию, отправляем с РI для оплаты (Бух Фин Рассылка)',
    'Составляем спецификацию №2, отправляем Ане + бизнес лицензия (Корея)',
    'Оправляем поставщику график платежей',
    'Пересылаем свифты поставщику (Аня в копии)',
    'Уточняем получение средств поставщиком',
    'Выясняем дату готовности груза, корректируем даты в бюджете',
    'Отправляем Ане бронь транспорта + бизнес лицензия + бюджет',
    'Пересылаем свифты Юле',
    'Получаем отгрузочные, проверяем, пересылаем Юле',
    'Отправляем Бух Фин Рассылка сумму оплаты на таможню',
    'Отправляем Лесе инфо по подготовке прихода',
    'Согласовываем с Аллой склад прихода',
    'Отправляем Алле инфо о кол-ве коробок в приходе',
    'Получаем ГТД от Юли',
    'Оплачиваем консалтинг',
    'Оплачиваем счета брокера',
    'Оплачиваем счета ВЭД',
    'Оплачиваем счета за транспорт',
    'Оплачиваем оставшийся транспорт',
    'Получаем инфо о доп.расходах',
  ];

  const [tasks, setTasks] = useState(
    initialTasks.map((text, index) => ({
      id: index + 1,
      text,
      completed: false,
    }))
  );

  const toggleTask = async id => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    setTasks(updatedTasks);

    const currentTask = updatedTasks.find(t => t.id === id);

    // ===== ЗАГЛУШКА ОТПРАВКИ НА BACKEND =====
    try {
      await fetch('/api/tasks/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: currentTask.id,
          completed: currentTask.completed,
        }),
      });

      console.log('Статус отправлен');
    } catch (error) {
      console.error('Ошибка отправки:', error);
    }
    // =======================================
  };

  return (
    <Container>
      <SearchContainer>
        <SearchBlock>
          <lable>Активні закази</lable>
          <input type="radio" />
        </SearchBlock>
        <SearchBlock>
          <lable>Всі закази</lable>
          <input type="radio" />
        </SearchBlock>
        <SearchBlock>
          <label htmlFor="producer">Оберіть виробника:</label>
          <Input list="producers" id="producer" name="producers" />
          <datalist id="producers">
            <option value="BR Pharm" />
            <option value="Sinclair" />
            <option value="Medytox" />
            <option value="Swedish Nutra" />
            <option value="Naveh" />
            <option value="303 Pharma" />
            <option value="LeaseMedica" />
            <option value="Regenbogen" />
            <option value="TechNature" />
          </datalist>
        </SearchBlock>
        <Button>Додати замовлення</Button>
      </SearchContainer>
      <Card>
        <OrderWrapper>
          <h3>BR Pharm</h3>
          <h5>Apriori Pharm/ Company Emet, USD</h5>
          <Form>
            <Label htmlFor="date">Очікувана дата надходження</Label>
            <Input
              type="date"
              id="date"
              // value={()=>{}}
              // onChange={()=>{}}
            />
          </Form>
          <Table cellSpacing="0" cellPadding="0" border="0">
            <thead>
              <tr>
                <Th1>Назва</Th1>
                <Th>PT</Th>
                <Th>PB</Th>
                <Th>К-сть</Th>
                <Th>FOC</Th>
                <Th>Сума</Th>
                <Th>Інвойс 1</Th>
                <Th>Інвойс 2</Th>
                <Th style={{ width: '60px' }}>Дії</Th>
              </tr>
            </thead>
            <tbody>
              {/* {m.products?.map((p) => ( */}
              <tr>
                {' '}
                {/* key={p._id}*/}
                <Th2>Vitaran i</Th2>
                {/*>{p.name}<*/}
                <Td>50</Td>
                {/* >{p.gap}<*/}
                <Td>25</Td>
                {/* >{p.billPrice}<*/}
                <Td>1000</Td>
                {/* и т.д.<*/}
                <Td>200</Td>
                <Td>50000</Td>
                <Td>30000</Td>
                <Td>20000</Td>
                <Td>
                  <ButtonsGroup
                    style={{ marginRight: '4px' }}
                    onClick={() => {}}
                  >
                    <Edit />
                  </ButtonsGroup>
                  <ButtonsGroup
                    style={{ marginLeft: '4px' }}
                    onClick={() => {}}
                  >
                    <Delete />
                  </ButtonsGroup>
                </Td>
              </tr>
              {/* ))} */}
            </tbody>
          </Table>
          <h5>Оплати</h5>
          <PaymentDiv>
            <Table>
              <thead>
                <tr>
                  <Th1>Дата</Th1>
                  <Th>Сума Інвоіс 1</Th>
                  <Th>Сума Інвоіс 2</Th>
                  <Th>План/Факт</Th>
                  <Th style={{ width: '60px' }}>Дії</Th>
                </tr>
              </thead>
              <tbody>
                {/* {m.products?.map((p) => ( */}
                <tr>
                  {' '}
                  {/* key={p._id}*/}
                  <Th2>02.06.2026</Th2>
                  {/*>{p.name}<*/}
                  <Td>5000</Td>
                  {/* >{p.gap}<*/}
                  <Td></Td>
                  {/* >{p.billPrice}<*/}
                  <Td>Факт</Td>
                  {/* и т.д.<*/}
                  <Td>
                    <ButtonsGroup
                      style={{ marginRight: '4px' }}
                      onClick={() => {}}
                    >
                      <Edit />
                    </ButtonsGroup>
                    <ButtonsGroup
                      style={{ marginLeft: '4px' }}
                      onClick={() => {}}
                    >
                      <Delete />
                    </ButtonsGroup>
                  </Td>
                </tr>
                {/* ))} */}
              </tbody>
              <tfoot>
                <tr>
                  <Td>Итого</Td>
                  <Td>5000</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
                <tr>
                  <Td>Осталось</Td>
                  <Td>25000</Td>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                </tr>
              </tfoot>
            </Table>
            <EditBtnBlock>
              <Button>Додати продукт</Button>
              <Button>Додати оплату</Button>
              <Button>Додати коментар</Button>
            </EditBtnBlock>
          </PaymentDiv>
          <h5>Коментар</h5>
          <Coment>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
            architecto ducimus dolore eos dicta consequatur optio repellat
            beatae minus, odit earum porro repellendus nostrum quaerat quo enim
            ex possimus aliquid.
          </Coment>
        </OrderWrapper>
        <CheckListWrapper>
          <h4>Чек-лист</h4>
          {tasks.map(task => (
            <label key={task.id}>
              <Checkbox
                type="checkbox"
                style={{ accentСolor: '#2c3e50', marginRight: '10px' }}
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <TaskText completed={task.completed}>{task.text}</TaskText>
            </label>
          ))}
        </CheckListWrapper>
        <ButtonsGroup>
          <Delete />
        </ButtonsGroup>
      </Card>

      {/* 1) Модалка Додати замовлення */}
      {/* <Modal 
                title={`Додати замовлення`} 
                onClose={() => {}}
                onSave={() => {}}
            >
                <Field>
                    <label htmlFor="producer">Оберіть виробника:</label>
                    <Input list="producers" id="producer" name="producers"/>
                {/* map по виробнику */}

      {/* <datalist id="producers">
                        <option value={()=>{}}/>
                    </datalist>
                </Field> */}
      {/* <Table>
                    <thead>
                        <tr>
                            <Th1>Продукт</Th1>
                            <Th>Кількість, без FOC</Th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <Th2>Vitaran i</Th2>
                            <Td>5000</Td>
                        </tr>
                        <tr>
                            <Th2>Vitaran i II</Th2>
                            <Td>3000</Td>
                        </tr>
                    </tbody>
                </Table>
                <Field>
                    <Label htmlFor="date">Дата надходження</Label>
                    <Input 
                        id="date"
                        type="month"
                        value={()=>{}} 
                        onChange={() => {}}   
                    />
                </Field>
                <Field>
                    <Label htmlFor="comment">Коментар</Label>
                    <Input 
                        id="comment"
                        value={()=>{}} 
                        onChange={() => {}}   
                    />
                </Field>
            </Modal> */}

      {/* 2) Модалка Змінити замовлення */}
      {/* <Modal 
                title={`Змінити замовлення`} 
                onClose={() => {}}
                onSave={() => {}}
            >
                <Product>Azulen Serum</Product>
                <Field2>
                    <Label>PT:</Label>
                    <Input 
                        value={()=>{}}
                        onChange={()=>{}}  />
                </Field2>
                <Field2>
                    <Label>PB:</Label>
                    <Input 
                        value={()=>{}}
                        onChange={()=>{}}  />
                </Field2>
                <Field2>
                    <Label>Кількість, без FOC:</Label>
                    <Input 
                        value={()=>{}}
                        onChange={()=>{}}  />
                </Field2>
                <Field2>
                    <Label>Кількість, FOC:</Label>
                    <Input 
                        value={()=>{}}
                        onChange={()=>{}}  />
                </Field2>
                <Field2>
                    <Label>Сума:</Label>
                    <Input 
                        value={()=>{}}
                        onChange={()=>{}}  />
                </Field2>
                <Field2>
                    <Label>Invoice 1:</Label>
                    <Input 
                        value={()=>{}}
                        onChange={()=>{}}  />
                </Field2>
                <Field2>
                    <Label>Invoice 2:</Label>
                    <Input 
                        value={()=>{}}
                        onChange={()=>{}}  />
                </Field2>
            </Modal> */}

      {/* 3) Модалка Додати продукт */}
      {/* <Modal 
                title={`Додати продукт`} 
                onClose={() => {}}
                onSave={() => {}}
            >
                <Field>
                    <label htmlFor="product">Оберіть продукт:</label>
                    <Input list="products" id="product" name="product"/> */}
      {/* map по виробнику */}
      {/* <datalist id="products">
                        <option value={()=>{}}/>
                    </datalist>
                </Field> 
                <Field2>
                <Label htmlFor="quantity">Кількість, без FOC:</Label>
                    <Input 
                        id="quantity"
                        value={()=>{}} 
                        onChange={() => {}}   
                    />
                </Field2>
            </Modal> */}

      {/* 4) Модалка Додати/змінити коментар */}
      {/* <Modal 
                title={`Додати/змінити коментар`} 
                onClose={() => {}}
                onSave={() => {}}
            >
                <Field>
                    <textarea 
                        name="comment" 
                        rows="5" 
                        cols="33"
                        // value={()=>{}}
                        // onChange={()=>{}}
                    >
                    </textarea>
                </Field>
            </Modal> */}

      {/* 5) Модалка Додати/змінити дату надходження */}
      {/* <Modal 
                title={`Додати/змінити дату надходження`} 
                onClose={() => {}}
                onSave={() => {}}
            >
                <Field>
                    <Label htmlFor="date">Дата надходження</Label>
                    <Input 
                        id="date"
                        type="month"
                        value={()=>{}} 
                        onChange={() => {}}   
                    />
                </Field>
            </Modal> */}

      {/* 6) Модалка Додати оплату */}
      {/* <Modal 
                title={`Додати оплату`} 
                onClose={() => {}}
                onSave={() => {}}
            >
                <Field2 style={{height: "14px"}}>
                    <Wrapper>
                        <Label htmlFor="Inv1">Invoice 1</Label>
                        <Input 
                            id="Inv1"
                            type="radio"
                            value={()=>{}} 
                            onChange={() => {}}   
                        />
                    </Wrapper>
                    <Wrapper>
                        <Label htmlFor="Inv2">Invoice 2</Label>
                        <Input 
                            id="Inv2"
                            type="radio"
                            value={()=>{}} 
                            onChange={() => {}}   
                        />
                    </Wrapper>
                </Field2>
                <Field2 style={{height: "14px"}}>
                    <Wrapper>
                        <Label htmlFor="fact">Фактична</Label>
                        <Input 
                            id="fact"
                            type="radio"
                            value={()=>{}} 
                            onChange={() => {}}   
                        />
                    </Wrapper>
                    <Wrapper>
                        <Label htmlFor="plan">Планова</Label>
                        <Input 
                            id="plan"
                            type="radio"
                            value={()=>{}} 
                            onChange={() => {}}   
                        />
                    </Wrapper>
                </Field2>
                <Field2 style={{marginTop: "40px"}}>
                    <Label>Дата оплати:</Label>
                    <Input 
                        type="date"
                        value={()=>{}}
                        onChange={()=>{}}  />
                </Field2>
                <Field2>
                    <Label>Cумма оплати</Label>
                    <Input 
                        value={()=>{}}
                        onChange={()=>{}}  />
                </Field2>
            </Modal> */}
    </Container>
  );
};
