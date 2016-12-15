import CompileError from '../errors/compileError';
import Utils from '../utils';

export default class WirtualKeyboard { 

    constructor() {
        this.containerID = 'wirtual-keyboard-container';
        this.keyboardID = 'wirtual-keyboard';
        this.active = false;
        this.activeTarget = false;
        
        this.shiftOn = false;
        this.altOn = false;
        this.capsOn = false;

        this.init();
    }

    init(){
        this.attachStyles();
        this.attachTemplate();
        this.attachEventListeners();
    }

    attachTemplate(){
        var template = `
            <div class="keyboard-cont animated slideInUp" id="`+this.containerID+`">
                <div class="keyboard" id="`+this.keyboardID+`">
                    <div class="logo">
                        <div class="align position">
                            <span class="align-button" id="keyboard-top-button">top</span>
                            <span class="align-button" id="keyboard-bottom-button">bottom</span>
                            <span class="align-button" id="keyboard-smaller-button">small</span>
                            <span class="align-button" id="keyboard-larger-button">large</span>
                        </div>
                        <div class="align close">
                            <span class="align-button" id="keyboard-close-button">close</span>
                        </div>
                    </div>  
                    <div class="nl">
                        <div class="key num dual" data-val="\`" data-shift-val="~">~<br>\`</div>
                        <div class="key num dual" data-val="1" data-shift-val="!">!<br>1</div>
                        <div class="key num dual" data-val="2" data-shift-val="@">@<br>2</div>
                        <div class="key num dual" data-val="3" data-shift-val="#">#<br>3</div>
                        <div class="key num dual" data-val="4" data-shift-val="$">$<br>4</div>
                        <div class="key num dual" data-val="5" data-shift-val="%">%<br>5</div>
                        <div class="key num dual" data-val="6" data-shift-val="^">^<br>6</div>
                        <div class="key num dual" data-val="7" data-shift-val="&">&<br>7</div>
                        <div class="key num dual" data-val="8" data-shift-val="*">*<br>8</div>
                        <div class="key num dual" data-val="9" data-shift-val="(">(<br>9</div>
                        <div class="key num dual" data-val="0" data-shift-val=")">)<br>0</div>
                        <div class="key num dual" data-val="-" data-shift-val="_">_<br>-</div>
                        <div class="key num dual" data-val="=" data-shift-val="+">+<br>=</div>
                        <div class="key backspace" data-val="backspace">Backspace</div>
                    </div>
                    <div class="nl">
                        <div class="key tab" data-val="tab">Tab</div>
                        <div class="key letter" data-val="q" data-shift-val="Q">Q</div>
                        <div class="key letter" data-val="w" data-shift-val="W">W</div>
                        <div class="key letter" data-val="e" data-shift-val="E">E</div>
                        <div class="key letter" data-val="r" data-shift-val="R">R</div>
                        <div class="key letter" data-val="t" data-shift-val="T">T</div>
                        <div class="key letter" data-val="y" data-shift-val="Y">Y</div>
                        <div class="key letter" data-val="u" data-shift-val="U">U</div>
                        <div class="key letter" data-val="i" data-shift-val="I">I</div>
                        <div class="key letter" data-val="o" data-shift-val="O">O</div>
                        <div class="key letter" data-val="p" data-shift-val="P">P</div>
                        <div class="key dual" data-val="{" data-alt-val="[">{<Br>[</div>
                        <div class="key dual" data-val="}" data-alt-val="]">}<br>]</div>
                        <div class="key letter dual slash" data-val="|" data-alt-val="\\">|<br>\\</div>	
                    </div>
                    <div class="nl">
                        <div class="key caps" id="keyboard-caps-button" data-val="caps">Caps<br>Lock</div>
                        <div class="key letter" data-val="a" data-shift-val="A">A</div>
                        <div class="key letter" data-val="s" data-shift-val="S">S</div>
                        <div class="key letter" data-val="d" data-shift-val="D">D</div>
                        <div class="key letter" data-val="f" data-shift-val="F">F</div>
                        <div class="key letter" data-val="g" data-shift-val="G">G</div>
                        <div class="key letter" data-val="h" data-shift-val="H">H</div>
                        <div class="key letter" data-val="j" data-shift-val="J">J</div>
                        <div class="key letter" data-val="k" data-shift-val="K">K</div>
                        <div class="key letter" data-val="l" data-shift-val="L">L</div>
                        <div class="key dual" data-val=":" data-alt-val=";">:<br>;</div>
                        <div class="key dual" data-val='"' data-alt-val="'">"<br>'</div>
                        <div class="key enter" data-val="enter">Enter</div> 
                    </div>    
                    <div class="nl">
                        <div class="key shift left" id="keyboard-shift-button" data-val="shift">Shift</div>
                        <div class="key letter" data-val="z" data-shift-val="Z">Z</div>  
                        <div class="key letter" data-val="x" data-shift-val="X">X</div>
                        <div class="key letter" data-val="c" data-shift-val="C">C</div>
                        <div class="key letter" data-val="v" data-shift-val="V">V</div>
                        <div class="key letter" data-val="b" data-shift-val="B">B</div>
                        <div class="key letter" data-val="n" data-shift-val="N">N</div>
                        <div class="key letter" data-val="m" data-shift-val="M">M</div>
                        <div class="key dual" data-val="<" data-alt-val=","> \< <br>,</div>
                        <div class="key dual" data-val=">" data-alt-val="."> \> <br>.</div>
                        <div class="key dual" data-val="?" data-alt-val="/">?<br>/</div>
                    </div>
                    <div class="nl">
                        <div class="key ctrl" data-val="clear">Clear</div>
                        <div class="key space" data-val=" "></div>
                        <div class="key" id="keyboard-alt-button" data-val="alt">Alt</div>
                    </div>
                </div>
            </div>
        `;

        // Add markup to body
        var htmlCont = document.createElement('div');
        htmlCont.innerHTML = template;
        document.body.appendChild(htmlCont);
    }

    attachStyles() {
        var styles = `
            .keyboard-cont {
                display: none;
                position: absolute;
                bottom: 20px;
                left: 0;
                width: 100%;
                text-align: center;
                z-index: 99999;
                animation-duration: .1s;
                -webkit-animation-duration: .1s;
                -moz-animation-duration: .1s;
                -o-animation-duration: .1s;
            }
            .keyboard{
                width:50%;
                background-color: #111;
                margin: 0px auto;
                border-radius: 9px;
                padding: 10px;
                color: #eee;
                border: 3px solid #eee;
            }
            .logo{
                height: 17px;
                color: #eee;
                font-size: 16px;
                font-family: monospace;
                margin-bottom: 10px;
                position: relative;
            }
            .align {
                font-size: 12px;
                vertical-align: middle;
            }
            .align.close {
                position: absolute;
                right: 15px;
                top: 2px;
            }
            .align.position {
                position: absolute;
                left: 15px;
                top: 2px;
            }
            .align.position .align-button {
                margin-right: 5px;
            }
            .key{
                user-select: none !important;
                width: 40px;
                height:40px;
                flex-grow: 1;
                display:inline-block;
                background-color:#333;
                text-align: left;
                padding-left: 8px;
                line-height: 29px;
                border-radius:2px;
                margin-left: 2px;
                margin-bottom:2px;
                cursor: pointer;
                vertical-align: top;
                font-family: monospace;
            }
            .key:active, .key.active {
                background-color:#eee;
                color: #333;
            }
            .nl {display: flex;}
            .align-button:hover { cursor: pointer; }
            .section-a{width:100%; height:260px; float:left;}
            .function{font-size: 12px; width:30px; height:30px; margin-bottom:15px;}
            .small{font-size:10px; line-height:13px; text-align: center; padding:0 5px; padding-top:2px; height:28px !important;}
            .space1{margin-right: 43px !important;}
            .space2{margin-right: 25px !important;}
            .dual {font-size: 14px; line-height: 20px; width:30px; }
            .backspace {width:84px; font-size: 12px;}
            .tab {width: 50px; line-height: 40px; font-size:13px;}
            .letter{width:30px;}
            .slash{width:64px;}
            .caps{width:70px; font-size:12px; line-height:18px;}
            .enter{width:92px; line-height:40px; text-align: center; padding-left:0;}
            .shift.left{width: 90px;line-height: 40px; font-size:13px;}
            .shift.right{width: 104px;line-height: 40px; font-size:13px;}
            .ctrl{width: 50px; line-height: 40px; font-size:13px;}
            .space{width:234px;}
            .arrows{position:relative; top:42px;}
            .sec-func .key{width: 32px; font-size:10px; text-align:left; line-height:40px; float:left;}
            .sec-func div.dual{line-height:20px;}
            .arrows .key{text-align: center; padding-left: 7px; margin-left:2px;}
            .hidden{visibility: hidden;}
            .key:hover{box-shadow:0px 0px 2px #eee; z-index:1000;}
        `;

        // Add styles to body
        var cssCont = document.createElement('style');
        cssCont.type = 'text/css';
        cssCont.innerHTML = styles;
        document.body.appendChild(cssCont);
    }

    attachEventListeners(){
        var self = this;
        
        // On focus
        document.addEventListener('focus',function(e){
            if (e.target.tagName==="TEXTAREA" || (e.target.tagName==="INPUT" && e.target.type==="text")){
                self.show(e.target);
            }
        }, true);

        // On close button
        document.getElementById('keyboard-close-button').addEventListener('click', function(){
			self.hide();
		});

        // On top button
        document.getElementById('keyboard-top-button').addEventListener('click', function(){
		    self.moveTop();
		});

        // On bottom button
        document.getElementById('keyboard-bottom-button').addEventListener('click', function(){
			self.moveDown();
		});

        // On smaller button
        document.getElementById('keyboard-smaller-button').addEventListener('click', function(){
            self.makeSmall();
		});

        // On larger button
        document.getElementById('keyboard-larger-button').addEventListener('click', function(){
            self.makeLarge();
		});

        // On keys clicked
        var keys = document.getElementsByClassName('key');
        for (var i = 0; i < keys.length; i++) {
            keys[i].addEventListener('click', function(e){ self.keyClicked(e); });
        }
    }
    keyClicked(e){
        var self = this;
        if (e && e.target && e.target.dataset){
            var btn = e.target.dataset;
            if (btn.val==='caps'){ self.toggleCaps(); }
            else if (btn.val==='shift'){ self.toggleShift(); }
            else if (btn.val==='alt'){ self.toggleAlt(); }
            else if (btn.val==='clear'){ self.clearInput(); }
            else if (btn.val==='backspace'){ self.backspaceClicked(); }
            else if (btn.val==='enter'){ self.enterClicked(); }
            else if (btn.val==='tab'){ self.tabClicked(); }
            else{ self.characterClicked(btn); }
        }
    }
    characterClicked(btn){
        if (this.ctrlOn){
            /* Do things with CTRL */
            this.toggleCtrlOff();
        }
        else if (this.shiftOn && btn.shiftVal){
            this.writeCharacter(btn.shiftVal);
            this.toggleShiftOff();
        }
        else if (this.altOn && btn.altVal){
            this.writeCharacter(btn.altVal);
            this.toggleAltOff();
        }
        else if (this.capsOn && btn.shiftVal){
            this.writeCharacter(btn.shiftVal);
        }
        else {
            this.writeCharacter(btn.val);
        }
    }
    tabClicked(){
        this.writeCharacter('\t');
    }
    enterClicked(){
        this.writeCharacter('\n');
    }
    backspaceClicked(){
        this.activeTarget.value = this.activeTarget.value.slice(0, -1);
    }
    writeCharacter(c){
        this.activeTarget.value += c;
    }
    clearInput(){
        this.activeTarget.value = '';
    }
    toggleCaps(){
        if (this.capsOn){ this.toggleCapsOff(); }
        else{ this.toggleCapsOn(); }
    }
    toggleCapsOn(){
        this.capsOn = true;
        Utils.addClass(document.getElementById('keyboard-caps-button'), 'active');
    }
    toggleCapsOff(){
        this.capsOn = false;
        Utils.removeClass(document.getElementById('keyboard-caps-button'), 'active');
    }
    toggleShift(){
        if (this.shiftOn){ this.toggleShiftOff(); }
        else{ this.toggleShiftOn(); }
    }
    toggleShiftOn(){
        this.shiftOn = true;
        Utils.addClass(document.getElementById('keyboard-shift-button'), 'active');
    }
    toggleShiftOff(){
        this.shiftOn = false;
        Utils.removeClass(document.getElementById('keyboard-shift-button'), 'active');
    }
    toggleAlt(){
        if (this.altOn){ this.toggleAltOff() }
        else{ this.toggleAltOn() }
    }
    toggleAltOn(){
        this.altOn = true;
        Utils.addClass(document.getElementById('keyboard-alt-button'), 'active');
    }
    toggleAltOff(){
        this.altOn = false;
        Utils.removeClass(document.getElementById('keyboard-alt-button'), 'active');
    }
    moveTop(){
        document.getElementById(this.containerID).style.bottom = null;
		document.getElementById(this.containerID).style.top = "20px";
    }
    moveDown(){
        document.getElementById(this.containerID).style.top = null;
		document.getElementById(this.containerID).style.bottom = "20px";
    }
    makeSmall(){
        document.getElementById(this.keyboardID).style.width = "50%";
    }
    makeLarge(){
        document.getElementById(this.keyboardID).style.width = "90%";
    }
    show(target){
        this.active = true;
        this.activeTarget = target;
        document.getElementById(this.containerID).style.display = "block";
    }
    hide(){
        this.active = false;
        this.activeTarget = null;
        document.getElementById(this.containerID).style.display = "none";
    }

}