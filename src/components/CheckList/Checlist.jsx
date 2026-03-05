import { Container, SearchContainer, Modal, Card } from "./CheckList.styled"

export const CheckList = () =>
{
    return (
        <Container>
            <SearchContainer>
                <div>
                    <lable>Активні закази</lable>
                    <input type="radio"/>
                </div>
                <div>
                    <lable>Всі закази</lable>
                    <input type="radio"/>
                </div>
                <div>
                    <label htmlFor="producer">Оберіть виробника:</label>
                    <input list="producers" id="producer" name="producers"/>
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
                </div>                
            </SearchContainer>
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
            <Card>
                <ul>
                    <li>Виробник</li>
                    <li>Продукти</li>
                    <li>Кількість без FOC</li>
                    <li>Кількість з FOC</li>
                    <li>PT</li>
                    <li>PB</li>
                    <li>Сумма Покупець</li>
                    <li>Сумма додаткові витрати</li>
                    <li>Сумма Всього</li>
                </ul>
                <p>Оплати</p>
                <ul>
                    <li>Сума, дата, PT/PB</li>
                    <li>Сума, дата, PT/PB</li>
                    <li>Всього</li>
                    <li>Залишок</li>
                </ul>
                <p>Чек-лист</p>
                <ul>
                    <li>пункт 1, чекбокс</li>
                    <li>пункт 2, чекбокс</li>
                    <li>пункт 3, чекбокс</li>
                    <li>пункт 4, чекбокс</li>
                    <li>пункт 5, чекбокс</li>
                </ul>
            </Card>

        </Container>
    )
    
    }
    