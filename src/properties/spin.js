import Api from '../api';

export default class Spin {

    static init(el) {
        if (el.dTarget.dataset && el.dTarget.dataset.spin) {
            // Get main target
            let rotateEl = el.vTarget.mainTarget;
            rotateEl.spin = true;
            // Read the spin speed
            let spinSpeed = parseFloat(el.dTarget.dataset.spin);
            // Set the direction
            if (el.dTarget.dataset.spinDirection && el.dTarget.dataset.spinDirection == "left") {
                spinSpeed *= -1;
            }

            Api.get()._attachRunnable(el.id, 'spin', (timestamp, timestampDelta) => {
                if (rotateEl.spin) { rotateEl.rotation.y += spinSpeed * timestampDelta; }
            });
        }
    }

}