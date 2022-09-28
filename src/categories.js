import MainContextMenu from "./components/contextMenus/MainContextMenu"
import TrashContextMenu from "./components/contextMenus/TrashContextMenu"
import SharedContextMenu from "./components/contextMenus/SharedContextMenu"

import HomeIcon from "./images/home-24.webp"
import LatestIcon from "./images/history.svg"
import ShareIcon from "./images/shared.svg"
import DeletedIcon from "./images/deleted.svg"

const categories = [{
    name: 'main',
    title: 'Главная',
    showTopPanel: true,
    contextMenu: <MainContextMenu />,
    showBackButtonInTitle: false,
    emptyMessage: "Папка пуста. Загрузите файлы или создайте новую папку",
    activeDragnDrop: true,
    hidden: false,
    icon: HomeIcon
}, {
    name: 'latest',
    title: 'Последние',
    showTopPanel: false,
    contextMenu: null,
    showBackButtonInTitle: false,
    emptyMessage: "Вы пока ничего не загрузили",
    activeDragnDrop: false,
    hidden: false,
    icon: LatestIcon
}, {
    name: 'shared',
    title: 'Общие',
    showTopPanel: false,
    contextMenu: <SharedContextMenu />,
    showBackButtonInTitle: false,
    emptyMessage: "Вы пока не открыли общий доступ к файлам",
    activeDragnDrop: false,
    hidden: false,
    icon: ShareIcon
}, {
    name: 'trash',
    title: 'Корзина',
    showTopPanel: false,
    contextMenu: <TrashContextMenu />,
    showBackButtonInTitle: true,
    emptyMessage: "Удалённых файлов нет",
    activeDragnDrop: false,
    hidden: false,
    icon: DeletedIcon
}, {
    name: 'search',
    title: 'Поиск файлов',
    showTopPanel: false,
    contextMenu: null,
    showBackButtonInTitle: false,
    emptyMessage: "Файлов по данному запросу нет",
    activeDragnDrop: false,
    hidden: true,
    icon: HomeIcon
}]

export default categories