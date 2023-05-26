import { makeAutoObservable } from "mobx";

class Store {
  widthCube = 100;
  heightCube = 100;
  arrColors = [
    { id: 1, color: "orange" },
    { id: 2, color: "lime" },
    { id: 3, color: "aqua" },
  ];

  arrCubes = [
    {
      id: 1,
      widthBox: this.widthCube,
      heightBox: this.heightCube,
      startShiftX: 600,
      startShiftY: 300,
      cordDropX: 0,
      cordDropY: 0,
      boxColor: "yellow",
      selected: false,
    },

    {
      id: 2,
      widthBox: this.widthCube,
      heightBox: this.heightCube,
      startShiftX: 600,
      startShiftY: 500,
      cordDropX: 0,
      cordDropY: 0,
      boxColor: "teal",
      selected: false,
    },
  ];

  mainBoxSize = { left: 0, top: 0, width: 0, height: 0 };
  isIntersect = false;

  eventDragStart = null;
  eventDragEnd = null;

  constructor() {
    makeAutoObservable(this);
  }

  //   Получаем события клика при начале и окнчании перемещения
  getClickPosition(event) {
    this.eventDragStart = event;
  }

  getEventDragEnd(event) {
    this.eventDragEnd = event;
  }

  // Разделяем соедененные кубики, возврашаем на стартовые позиции
  splitIntersectedCubes() {
    if (this.isIntersect) {
      this.arrCubes[0].cordDropX = 0;
      this.arrCubes[0].cordDropY = 0;
      this.arrCubes[0].startShiftX = 500;
      this.arrCubes[0].startShiftY = 200;

      this.arrCubes[1].cordDropX = 0;
      this.arrCubes[1].cordDropY = 0;
      this.arrCubes[1].startShiftX = 300;
      this.arrCubes[1].startShiftY = 400;
    }

    this.isIntersect = false;
  }

  // Выбираем кубик кликом
  selectedCube(cubeId) {
    this.arrCubes.forEach((item) => {
      if (item.id === cubeId) {
        item.selected = !item.selected;
      } else {
        item.selected = false;
      }
    });
  }

  //   Устанавливаем цвет
  setColorCube(color) {
    const cube = this.arrCubes.find((cube) => cube.selected === true);

    if (cube) {
      cube.boxColor = color;
    }
  }

  //Расчитываем координаты кубов для движения вместе
  setCordinateMoveTogether(cubeId, cordX, cordY) {
    const currentCube = this.arrCubes.find((item) => item.id === cubeId);
    const otherCubes = this.arrCubes.filter((item) => item.id !== cubeId);

    const diffXcalc = cordX - currentCube.cordDropX;
    const diffYcalc = cordY - currentCube.cordDropY;

    otherCubes.forEach((item) => {
      item.cordDropX += diffXcalc;
      item.cordDropY += diffYcalc;
    });

    currentCube.cordDropX = cordX;
    currentCube.cordDropY = cordY;
  }

  //Сохраняем координаты позиции куба
  saveCordinateCube(id, cordX, cordY) {
    this.arrCubes.find((item) => {
      if (id === item.id) {
        item.cordDropX = cordX;
        item.cordDropY = cordY;
      }
    });
  }

  // Проверяем пересечение кубиков
  checIntersectsCube(cubeId, cordX, cordY, widthBox, heightBox) {
    this.arrCubes.find((item) => {
      if (cubeId !== item.id) {
        const right = item.cordDropX + widthBox;
        const left = item.cordDropX - widthBox;
        const top = item.cordDropY - heightBox;
        const bottom = item.cordDropY + heightBox;

        if (
          top <= cordY &&
          bottom >= cordY &&
          left <= cordX &&
          right >= cordX
        ) {
          this.isIntersect = true;
        }
      }
    });
  }

  //   Размеры контейнера
  getSizeBorderMain(left, top, width, height) {
    this.mainBoxSize.left = left;
    this.mainBoxSize.top = top;
    this.mainBoxSize.width = width;
    this.mainBoxSize.height = height;
  }
}

export default new Store();
