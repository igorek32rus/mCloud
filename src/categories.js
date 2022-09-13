import MainContextMenu from "./components/contextMenus/MainContextMenu"
import TrashContextMenu from "./components/contextMenus/TrashContextMenu"

const categories = [{
    name: 'main',
    title: 'Главная',
    showTopPanel: true,
    contextMenu: <MainContextMenu />,
    showBackButtonInTitle: false,
    emptyMessage: "Папка пуста. Загрузите файлы или создайте новую папку",
    activeDragnDrop: true
}, {
    name: 'latest',
    title: 'Последние',
    showTopPanel: false,
    contextMenu: null,
    showBackButtonInTitle: false,
    emptyMessage: "Вы пока ничего не загрузили",
    activeDragnDrop: false
}, {
    name: 'shared',
    title: 'Общие',
    showTopPanel: false,
    contextMenu: null,
    showBackButtonInTitle: false,
    emptyMessage: "Вы пока не открыли общий доступ к файлам",
    activeDragnDrop: false
}, {
    name: 'trash',
    title: 'Корзина',
    showTopPanel: false,
    contextMenu: <TrashContextMenu />,
    showBackButtonInTitle: true,
    emptyMessage: "Удалённых файлов нет",
    activeDragnDrop: false
}]

export default categories