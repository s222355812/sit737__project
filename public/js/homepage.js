// Add images on Hompage and View All Page
const id1 = 'specialisation';
const id2 = 'specialisation-all';
const id3 = 'common-conditions';
const id4 = 'common-conditions-all';
const id5 = 'common-services';
const id6 = 'common-services-all';

const getHomepageData = () => {
  $.get('/api/homepage', (response) => {
    if (response.statusCode == 200) {
      displayServiceContent(response.data[0].specialisation, id1);
      displayServiceContentAll(response.data[0].specialisation, id2);
      displayServiceContent(response.data[0].commonConditions, id3);
      displayServiceContentAll(response.data[0].commonConditions, id4);
      displayServiceContent(response.data[0].commonServices, id5);
      displayServiceContentAll(response.data[0].commonServices, id6);
    }
  });
};

getHomepageData();

const addText = (data) => {
  return `
          <div class="row col s6 m4 l3 center-align">
            <div class="card small hoverable service-card">
              <div class="card-image">                
              <img src="${data.image}" />                 
              </div>
              <div class="card-content service-content">
                <form action="/search" method="POST">
                  <input type="hidden" name="search" value="${data.description}"/>
                  <div class="row">
                    <button class="col s12 btn waves-effect waves-light cyan white-text z-depth-0" type="submit" name="action">
                      ${data.description}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        `;
};

const displayServiceContent = (data, id) => {
  for (let i = 0; i < 8; i++) {
    if (document.getElementById(id)) {
      document
        .getElementById(id)
        .insertAdjacentHTML('beforebegin', addText(data[i]));
    }
  }
};

const displayServiceContentAll = (data, id) => {
  data.forEach((data) => {
    if (document.getElementById(id)) {
      document
        .getElementById(id)
        .insertAdjacentHTML('beforebegin', addText(data));
    }
  });
};
