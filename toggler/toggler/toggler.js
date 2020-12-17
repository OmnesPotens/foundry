const Toggler = (() => {
	// VERSION INFORMATION
	const Toggler_Author = "Sky#9453";
	const Toggler_Version = "0.0.1";
	const Toggler_LastUpdated = 1605926745;

	function toggleVisionEffect(app, html, data) {
		let items = data.actor.items;
		// let vision_item = items.find(i => i.transferredEffects().toLowerCase().includes("vision"));
		Object.entries(items).forEach((item) => {
			if (item.transferredEffects().toLowerCase().includes("vision")) {
				let actor = game.actors.get(data.actor._id);
				let tokens = actor.getActiveTokens();
				for (let token of tokens) {
					if (!token.data.flags?.toggler?.init) {
						let init_flag = "flags.toggler.".concat(token.name.toLowerCase(), ".init");
						let vision_flag = "flags.toggler.".concat(token.name.toLowerCase(), ".orig_vision");
						let json_obj = {};
						json_obj[init_flag] = true;
						json_obj[vision_flag] = {
							hasVision: true,
							dimSight: token.data.dimSight,
							brightSight: token.data.brightSight,
							sightAngle: token.data.sightAngle,
							dimLight: token.datadimLight,
							brightLight: token.data.brightLight,
							lightAngle: token.data.lightAngle,
							lightAnimation: token.data.lightAnimation
						};
						console.log("THIS IS MY JSON OBJ")
						console.log(json_obj)
						console.log("END OF JSON OBJ")
						token.update(json_obj);
					}
					let orig_vision = token.data.flags?.toggler?.orig_vision;
					if (item.data.equipped) {
						token.update({ dimSight: orig_vision.dimSight + 60 });
					} else {
						token.update(orig_vision);
					}
				}
			}
		});
	}

	Hooks.on("ready", function () {
		Hooks.on("renderActorSheet5eCharacter", (app, html, data) => {
			toggleVisionEffect(app, html, data);
		});
		console.log("-=> Toggler v" + Toggler_Version + " <=- [" + (new Date(Toggler_LastUpdated * 1000)) + "]");
	});
})();