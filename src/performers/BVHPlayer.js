
const bvhLoader = require('three/examples/js/loaders/BVHLoader.js');

import Common from './../util/Common';

const _ = require('lodash').mixin(require('lodash-keyarrange'));

import dat from 'dat-gui';

class BVHPlayer {
  constructor(file, parent, autoplay, callback) {
    this.parent = parent;
    this.callback = callback;

    this.autoplay = autoplay;
    this.playing = false;
    this.looping = false;

    this.clock = new THREE.Clock();

    this.mixer;
    this.clip;
    this.skeletonHelper;
    this.boneContainer = new THREE.Group();

    this.loader = new THREE.BVHLoader();

    this.loadBVH(file);

    this.update();
  }

  play() {
    if (this.mixer.clipAction(this.clip).setEffectiveWeight(1.0).paused == false) {
      this.mixer.clipAction(this.clip).setEffectiveWeight(1.0).play();
      this.playing = true;
    } else {
      this.mixer.clipAction(this.clip).setEffectiveWeight(1.0).paused = false;
      this.playing = false;
    }
  }

  pause() {
    this.mixer.clipAction(this.clip).setEffectiveWeight(1.0).paused = true;
    this.playing = false;
  }

  stop() {
    this.mixer.clipAction(this.clip).setEffectiveWeight(1.0).stop();
    this.playing = false;
  }

  loop() {
    this.mixer.clipAction(this.clip).setEffectiveWeight(1.0).setLoop(THREE.LoopRepeat);
    this.looping = true;
  }

  noLoop() {
    this.mixer.clipAction(this.clip).setEffectiveWeight(1.0).setLoop(THREE.LoopOnce, 0);
    this.looping = false;
  }

  getPlay() {
    return this.playing;
  }

  getLoop() {
    return this.looping;
  }

  loadBVH(bvhFile) {
    this.loader.load(bvhFile, (result) => {
      console.log('BVH File Loaded...');

      this.skeletonHelper = new THREE.SkeletonHelper(result.skeleton.bones[0]);
      this.skeletonHelper.skeleton = result.skeleton; // allow animation mixer to bind to SkeletonHelper directly

      this.boneContainer.add(result.skeleton.bones[0]);

      // play animation
      this.mixer = new THREE.AnimationMixer(this.skeletonHelper);
      this.clip = result.clip;

      this.play();
      if (!this.autoplay) {
        this.stop();
      }
    });
  }

  parseFrameData(data, name) {
    return {
      name: name.toLowerCase(),
      position: data.position,
      quaternion: data.quaternion,
    };
  }

  update() {
    requestAnimationFrame(this.update.bind(this));
    if (this.mixer) {
      this.mixer.update(this.clock.getDelta());

      const bones = _.map(_.uniqBy(_.map(this.mixer._bindingsByRootAndName[Object.keys(this.mixer._bindingsByRootAndName)[0]], (part, key) => part.binding.targetObject), 'name'), part => this.parseFrameData(part, part.name));

      if (bones.length > 0) {
        this.callback(`BVH_User_${Object.keys(this.mixer._bindingsByRootAndName)[0]}`, bones, 'bvh', null, {
          play: this.play.bind(this),
          pause: this.pause.bind(this),
          stop: this.stop.bind(this),
          loop: this.loop.bind(this),
          noLoop: this.noLoop.bind(this),
          playing: this.playing,
          looping: this.looping,
        });
      }
    }
  }
}

module.exports = BVHPlayer;
