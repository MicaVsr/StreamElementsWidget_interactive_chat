var manaIsOn = false;
	manaOnText = 'Tiren maná';
	manaOffText = 'No tiren maná';
	manaOnCommand = '!manaon';
	manaOffCommand = '!manaoff';
	textColor = "#ffeaf5";
	baseNeonColor = "#c5009f";
	softerNeonColor = "#dd8fad";
	darkerNeonColor = "#db468d";

const manaOnCommandText = `<span class=\"emote\">{manaOnCommand}</span>`;
const manaOffCommandText = `<span class=\"emote\">{manaOffCommand}</span>`;

window.addEventListener('onWidgetLoad', function (obj) {
    let recents = obj.detail.recents;
    recents.sort(function (a, b) {
        return Date.parse(a.createdAt) - Date.parse(b.createdAt);
    });
    userCurrency = obj.detail.currency;
    const fieldData = obj.detail.fieldData;
  
  	getManaStatus();
    updateManaInOverlay();
});

window.addEventListener('onEventReceived', function (obj) {
    if (!obj.detail.event) {
      return;
    }
    if (typeof obj.detail.event.itemId !== "undefined") {
        obj.detail.listener = "redemption-latest"
    }
    const listener = obj.detail.listener.split("-")[0];
    const event = obj.detail.event;

    if (listener === 'message') {
      //Agregar esto al if para acceso a mods = event.data.roles.includes('moderator')
      
      if(event.data.roles.includes('streamer')) {
        if(event.renderedText === manaOnCommandText){
        	setManaStatus(true);
      	}
        if(event.renderedText === manaOffCommandText){
          	setManaStatus(false);
        }
      }
    }
});

function getManaStatus(){
	SE_API.store.get('manaIsOn').then(obj => {
        if(obj == null){
          	setManaStatus(true);
          	manaIsOn = true;
        } else {
        	manaIsOn = obj.value;
        }

      	updateManaInOverlay();
    });
}

function setManaStatus(status){
	SE_API.store.set('manaIsOn', {value: status});
  	getManaStatus();
}

function updateManaInOverlay(){
  	if(manaIsOn){
     	$("#status_container").html(`<p class="neon-text mana-on">{manaOnText}</p>`)
    } else {
    	$("#status_container").html(`<p class="neon-text mana-off">{manaOffText}</p>`)
    }
}

window.addEventListener('onWidgetLoad', function (obj) {
    const fieldData = obj.detail.fieldData;
    textColor = fieldData.textColor;
  	baseNeonColor = fieldData.baseNeonColor;
  	manaOnText = fieldData.manaOnText;
  	manaOffText = fieldData.manaOffText;
  	manaOnCommand = fieldData.manaOnCommand;
    manaOffCommand = fieldData.manaOffCommand;
  	softerNeonColor = fieldData.softerNeonColor;
	darkerNeonColor = fieldData.darkerNeonColor;
});

