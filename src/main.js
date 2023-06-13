import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import ButtonPointPresenter from './presenter/button-point-presenter.js';
import { END_POINT, AUTHORIZATION } from './const.js';
import { render } from './framework/render.js';
import PointsModel from './model/point-model.js';
import FilterModel from './model/filters-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offer-model.js';
import SiteMenuView from './view/menu-site-view.js';
import PointsApiService from './api-service/points-api-service.js';
import DestinationsApiService from './api-service/destinations-api-service.js';
import OffersApiService from './api-service/offers-api-service.js';


const siteHeaderElement = document.querySelector('.trip-main');
const siteMainElement = document.querySelector('.page-main');

const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const destinationsModel = new DestinationsModel(new DestinationsApiService(END_POINT, AUTHORIZATION));
const offersModel = new OffersModel(new OffersApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();
const filterPresenter = new FilterPresenter({
  filterContainer: siteHeaderElement.querySelector('.trip-controls__filters'),
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel,
  filterModel: filterModel
});
filterPresenter.init();

const boardPresenter = new BoardPresenter({
  tripInfoContainer: siteHeaderElement.querySelector('.trip-main__trip-info'),
  tripContainer: siteMainElement.querySelector('.trip-events'),
  pointsModel: pointsModel,
  filterModel: filterModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});
boardPresenter.init();

const buttonPointPresenter = new ButtonPointPresenter({
  buttonPointContainer: siteHeaderElement,
  destinationsModel: destinationsModel,
  pointsModel: pointsModel,
  offersModel: offersModel,
  boardPresenter: boardPresenter
});
buttonPointPresenter.init();

offersModel.init().finally(() => {
  destinationsModel.init().finally(() => {
    pointsModel.init().finally(() => {
      buttonPointPresenter.renderButtonPoint();
    });
  });
});

render(new SiteMenuView(), siteHeaderElement.querySelector('.trip-controls__navigation'));
