
import { useState } from "react";
import { Edit } from "img/Edit"
import { Container, SearchContainer, SearchBlock, Input, Button, Modal, 
Card, Table, Th1, Th2, Th, Td, ButtonsGroup, PaymentDiv, EditBtnBlock, TaskText, Textarea, OrderWrapper, CheckListWrapper } from "./CheckList.styled"
import { Delete } from "img/Delete"

export const CheckList = () => {

    const initialTasks = [
        "Создаем бюджет",
        "Согласовываем с бух / ФО график платежей",
        "Согласовываем с Юлей расходы - логистика, таможня, ВЭД, брокер",
        "Проводим бюджет",
        "Размещаем заказ",
        "Получаем PI",
        "Проверяем PI, отправляем Юля для составления спецификации",
        "Проверяем спецификацию, отправляем с РI для оплаты (Бух Фин Рассылка)",
        "Составляем спецификацию №2, отправляем Ане + бизнес лицензия (Корея)",
        "Оправляем поставщику график платежей",
        "Пересылаем свифты поставщику (Аня в копии)",
        "Уточняем получение средств поставщиком",
        "Выясняем дату готовности груза, корректируем даты в бюджете",
        "Отправляем Ане бронь транспорта + бизнес лицензия + бюджет",
        "Пересылаем свифты Юле",
        "Получаем отгрузочные, проверяем, пересылаем Юле",
        "Отправляем Бух Фин Рассылка сумму оплаты на таможню",
        "Отправляем Лесе инфо по подготовке прихода",
        "Согласовываем с Аллой склад прихода",
        "Отправляем Алле инфо о кол-ве коробок в приходе",
        "Получаем ГТД от Юли",
        "Оплачиваем консалтинг",
        "Оплачиваем счета брокера",
        "Оплачиваем счета ВЭД",
        "Оплачиваем счета за транспорт",
        "Оплачиваем оставшийся транспорт",
        "Получаем инфо о доп.расходах"
      ];

    const [tasks, setTasks] = useState(
        initialTasks.map((text, index) => ({
          id: index + 1,
          text,
          completed: false,
        }))
      );
    
      const toggleTask = async (id) => {
        const updatedTasks = tasks.map((task) =>
          task.id === id
            ? { ...task, completed: !task.completed }
            : task
        );
    
        setTasks(updatedTasks);
    
        const currentTask = updatedTasks.find((t) => t.id === id);
    
        // ===== ЗАГЛУШКА ОТПРАВКИ НА BACKEND =====
        try {
          await fetch("/api/tasks/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: currentTask.id,
              completed: currentTask.completed,
            }),
          });
    
          console.log("Статус отправлен");
        } catch (error) {
          console.error("Ошибка отправки:", error);
        }
        // =======================================
      };

    return (
        <Container>
            <SearchContainer>
                <SearchBlock>
                    <lable>Активні закази</lable>
                    <input type="radio"/>
                </SearchBlock>
                <SearchBlock>
                    <lable>Всі закази</lable>
                    <input type="radio"/>
                </SearchBlock>
                <SearchBlock>
                    <label htmlFor="producer">Оберіть виробника:</label>
                    <Input list="producers" id="producer" name="producers"/>
                    <datalist id="producers">
                        <option value="BR Pharm"/>
                        <option value="Sinclair"/>
                        <option value="Medytox"/>
                        <option value="Swedish Nutra"/>
                        <option value="Naveh" />
                        <option value="303 Pharma" />
                        <option value="LeaseMedica" />
                        <option value="Regenbogen" />
                    </datalist>
                </SearchBlock>   
                <Button>Додати замовлення
                </Button>             
            </SearchContainer>
            <Card>
                <OrderWrapper>
                    <h3>BR Pharm</h3>
                    <h5>Apriori Pharm/ Company Emet, USD</h5>
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
                                <Th style={{width: "60px"}}>Дії</Th>
                            </tr>
                        </thead>
                        <tbody>
                        {/* {m.products?.map((p) => ( */}
                            <tr> {/* key={p._id}*/}
                                <Th2>Vitaran i</Th2>{/*>{p.name}<*/}
                                <Td>50</Td>{/* >{p.totalPrice}<*/}
                                <Td>25</Td>{/* >{p.billPrice}<*/}
                                <Td>1000</Td>{/* и т.д.<*/}
                                <Td>200</Td>
                                <Td>50000</Td>
                                <Td>30000</Td>
                                <Td>20000</Td>
                                <Td>
                                    <ButtonsGroup style={{marginRight: '4px'}} onClick={() => {}}><Edit/></ButtonsGroup>
                                    <ButtonsGroup style={{marginLeft: '4px'}} onClick={() => {}}><Delete/></ButtonsGroup>
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
                                    <Th style={{width: "60px"}}>Дії</Th>
                                </tr>
                            </thead>
                            <tbody>
                            {/* {m.products?.map((p) => ( */}
                                <tr> {/* key={p._id}*/}
                                    <Th2>02.06.2026</Th2>{/*>{p.name}<*/}
                                    <Td>5000</Td>{/* >{p.totalPrice}<*/}
                                    <Td></Td>{/* >{p.billPrice}<*/}
                                    <Td>Факт</Td>{/* и т.д.<*/}
                                    <Td>
                                        <ButtonsGroup style={{marginRight: '4px'}} onClick={() => {}}><Edit/></ButtonsGroup>
                                        <ButtonsGroup style={{marginLeft: '4px'}} onClick={() => {}}><Delete/></ButtonsGroup>
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
                    <Textarea placeholder="Коментар"></Textarea>
                </OrderWrapper>
                <CheckListWrapper>
                    <h4>Чек-лист</h4>
                    {tasks.map((task) => (
                    <label key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTask(task.id)}
                        />
                        <TaskText completed={task.completed}>
                            {task.text}
                        </TaskText>
                    </label>
                    ))}
                </CheckListWrapper>


            </Card>
            <Modal>
                <div>
                    <label htmlFor="manufactor">Виробник:</label>
                    <input
                        list="manufactors"
                        id="manufactor"
                        name="manufactors" />
                    <datalist id="manufactors">
                        <option value="BR Pharm"/>
                        <option value="Sinclair"/>
                        <option value="Medytox"/>
                        <option value="Swedish Nutra"/>
                        <option value="Naveh" />
                        <option value="303 Pharma" />
                        <option value="LeaseMedica" />
                        <option value="Regenbogen" />
                    </datalist>
                </div>  
                <div>
                    рендер продуктов
                    <ul>
                        <li>
                                <p> название 1</p>
                                <input
                                    type="number"
                                placeholder='количество без FOC'
                            />
                        </li>
                        <li>
                            <p> название 2</p>
                            <input
                                type="number"
                                placeholder='количество без FOC'
                            />
                        </li>
                        <li>
                            <p> название 3</p>
                            <input
                                type="number"
                                placeholder='количество без FOC'
                                />
                        </li>
                    </ul>
                <button>Сохранить заказ</button>
                </div>
            </Modal>

        </Container>
    )
    

}