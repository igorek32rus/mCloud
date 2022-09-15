import MainContextMenu from "./components/contextMenus/MainContextMenu"
import TrashContextMenu from "./components/contextMenus/TrashContextMenu"

const categories = [{
    name: 'main',
    title: 'Главная',
    showTopPanel: true,
    contextMenu: <MainContextMenu />,
    showBackButtonInTitle: false,
    emptyMessage: "Папка пуста. Загрузите файлы или создайте новую папку",
    activeDragnDrop: true,
    hidden: false
}, {
    name: 'latest',
    title: 'Последние',
    showTopPanel: false,
    contextMenu: null,
    showBackButtonInTitle: false,
    emptyMessage: "Вы пока ничего не загрузили",
    activeDragnDrop: false,
    hidden: false
}, {
    name: 'shared',
    title: 'Общие',
    showTopPanel: false,
    contextMenu: null,
    showBackButtonInTitle: false,
    emptyMessage: "Вы пока не открыли общий доступ к файлам",
    activeDragnDrop: false,
    hidden: false
}, {
    name: 'trash',
    title: 'Корзина',
    showTopPanel: false,
    contextMenu: <TrashContextMenu />,
    showBackButtonInTitle: true,
    emptyMessage: "Удалённых файлов нет",
    activeDragnDrop: false,
    hidden: false
}, {
    name: 'search',
    title: 'Поиск файлов',
    showTopPanel: false,
    contextMenu: null,
    showBackButtonInTitle: false,
    emptyMessage: "Файлов по данному запросу нет",
    activeDragnDrop: false,
    hidden: true
}]

export default categories