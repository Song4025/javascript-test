class calcWindow extends HTMLElement{

    constructor()
    {
        super();
        this.addEventListener('click', this.#handleClick);
        this.addEventListener('keyup', this.#handleKey);
        this.validationCalc = {
            principal: false,
            period: false,
            interest: false
        }
        this.validationSave = {
            principal: false,
            period: false,
            interest: false
        }
        this.validationLoan = {
            principal: false,
            period: false,
            interest: false
        }
        this.PRINCIPAL_MAX = 9999999999;
        this.PRINCIPAL_MIN = 1;
    };
    
    static get observedAttributes(){
        return ['type'];
    }

    #handleClick(e)
    {
        e.preventDefault();
        const node = e.target;
        if (node.className.match(/command-option/)) {
            this.#closeOtherOption(node);
            this.#toggleButton(node);
            this.#setText(node, node);
            this.#setMaxAttribute(node, node);
            const targetNode = node.closest('.inp-wrap').querySelector('input');
            this.#doInputEvent(targetNode);
            return;
          }
        if(node.nodeName.match(/command-hide-calc-window/))
        {
            this.#deleteWindow();
            return;
        }

        if(node.className.match(/command-show-tab/))
        {
            this.#showTab(node);
            return;
        }

        if(node.className.match(/command-open-option/))
        {
            this.#closeOtherOption(node);
            this.#toggleButton(node);
            return;
        }

        if(node.className.match(/command-set-option/))
        {
            const button = (node.closest('div').querySelector('button'));
            this.#toggleButton(button);
            this.#setText(button, node);
            this.#setMaxAttribute(button, node);
            const target_node = node.closest('.inp-wrap').querySelector('input');
            this.#doInputEvent(target_node);
            return;
        }

        if(node.className.match(/command-show-loan-result/))
        {
            parseMSG.appendElementToTarget({templateCode:'loanResult', data:"aaaaa"}, document.querySelector('main'));
            return;
        }

        if(node.className.match(/command-select-tax/))
        {
            this.#checkedTax(node);
        }
    }

    #handleKey(e)
    {
        e.preventDefault();
        this.#doInputEvent(e.target);
    }

    connectedCallback()
    {
        this.#setStyle();
        this.#render();
        return true;
    }

    attributeChangedCallback(name, oldValue, newValue)
    {}

    #render()
    {
        const template = document.querySelector('#calc_window');
        this.appendChild(template.content.cloneNode(trie));
    }
    #setStyle()
    {
        this.style.display = 'block';
        this.style.position = 'fixed';
        this.style.bottom = '20px';
        this.style.right = '10px';
        this.style.zIndex = 600;
    }
    #deleteWindow()
    {
        this.remove();
    }
    #showTab(node)
    {
        this.querySelectorAll('div.active').forEach(item=>item.classList.remove('active'));
        node.closest('div').classList.add('active');
    }

    #toggleButton(node)
    {
        node.classList.toggle('active');
        $(node).next('ul').stop().slideToggle(300);
    }
    #closeOtherOption(node)
    {
        let otherbutton;
        node.closest('form').querySelectorAll('command-open-option').forEach(button => {
            if(button !== node) otherbutton = button;
        });
        if(otherbutton)
        {
            otherbutton.classList.remove('active');
            $(otherbutton).next('ul').css('display', 'none');
        }
    }
    #setText(button, node)
    {
        node.innerText = node.innerText;
    }
    #setMaxAttribute(button, node)
    {
        const period = node.closest('form').querySelector('input[name=period]');
        if(button.innerText === '년') period.setAttribute('max', 100);
        else if(button.innerText === '월') period.setAttribute('max', 1200);
    }
    #checkedTax(node) {
        if (node.type !== "radio") {
          node = node.closest("li").querySelector("input");
        }
        setTimeout(() => {
          node.checked = true;
          const result = this.#calculate(node);
          this.#showResult(node, result);
        }, 100);
      }

    #doInputEvent(node)
    {
        
        if(node.closest('form').name == 'deposit')
        {
            this.#checkValidation(node);
                if(this.validationCalc.principal && this.validationCalc.period && this.validationCalc.interest)
            {
                this.#setDisabledButton(node, false);
                const result = this.#calculate(node);
                this.#showResult(node, result);
            }
            else
            {
                this.#setDisabledButton(node, true);
            }
        }
        else if(node.closest('form').name == 'saving')
        {
            this.#checkValidation(node);
                if(this.validationSave.principal && this.validationSave.period && this.validationSave.interest)
            {
                this.#setDisabledButton(node, false);
                const result = this.#calculate(node);
                this.#showResult(node, result);
            }
            else
            {
                this.#setDisabledButton(node, true);
            }
        }
        else
        {
            this.#checkValidation(node);
                if(this.validationLoan.principal && this.validationLoan.period && this.validationLoan.interest)
            {
                this.#setDisabledButton(node, false);
                const result = this.#calculate(node);
                this.#showResult(node, result);
            }
            else
            {
                this.#setDisabledButton(node, true);
            }
        }
        
    }

    #checkValidation(node)
    {
        if(!node.value)
        {
            if(node.closest('form').name == 'deposit')
            {
                this.validationCalc[node.name] = false;
                return;
            }
            else if(node.closest('form').name == 'saving')
            {
                this.validationSave[node.name] = false;
                return;
            }
            else
            {
                this.validationLoan[node.name] = false;
                return;
            }
        }
        if(node.name === 'principal')
        {
            const principal = parseInt(node.value.replace(/,/g, ""));
            if(isNaN(principal))
            {
                this.#setPrincipalValid(node, false, 'invalid field');
            }
            else
            {
                if(this.PRINCIPAL_MIN <= principal && principal < this.PRINCIPAL_MAX) this.#setPrincipalValid(node, true, "");
                else this.#setPrincipalValid(node, false, "invalid field");
                node.value = this.#numberWithCommas(principal);
            }
        }
        else
        {
            if(node.closest('form').name == 'deposit')
            {
                this.validationCalc[node.name]  = node.validity.valid
            }
            if(node.closest('form').name == 'saving')
            {
                this.validationSave[node.name]  = node.validity.valid
            }
            else
            {
                this.validationLoan[node.name]  = node.validity.valid
            }
        }
    }

    #setPrincipalValid(node, valid, text)
    {
        if(node.closest('form').name == 'deposit')
        {
            this.validationCalc.principal = valid;
            node.setCustomValidity(text);
        }
        else if(node.closest('form').name == 'saving')
        {
            this.validationSave.principal = valid;
            node.setCustomValidity(text);
        }
        else
        {
            this.validationLoan.principal = valid;
            node.setCustomValidity(text);
        }
    }

    #setDisabledButton(node, disabled)
    {
        node.closest('form').querySelector('button.command-show-result').disabled = disabled;
    }

    // comma
    #numberWithCommas(number)
    {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    #calculate(node) {
        if (!this.validation.principal || !this.validation.period || !this.validation.interest)
          return;
      
        const form = node.closest("form");
        const data = {};
        data.principal = parseInt(form.principal.value.replace(/,/g, ""));
        data.periodType = form.querySelector("button.selected-year").innerText;
        data.period = data.periodType === "월" ? parseInt(form.period.value) : parseInt(form.period.value) * 12;
        data.interestType = form.querySelector("button.selected-interest").innerText;
        data.interest = Number(form.interest.value);
        data.taxType = Number(form.querySelector('input[name="tax_type"]:checked').value);
      
        // 선택한 단리, 복리 및 과세, 비과세 유형에 따른 계산 로직
        if (form.name === "deposit") {
          return this.#deposit(data);
        } else if (form.name === "saving") {
          return this.#saving(data);
        } else {
          return this.#loan(data);
        }
      }

    //예금계산
    #deposit(data)
    {
        const result = {type: 'deposit'};
        if(data.interestType === '단리')
        {
            result.interestBeforeTax = data.principal * (data.interest / 100) * (data.period / 12);
        }
        else if(data.interestType === '복리')
        {
            result.interestBeforeTax = data.principal * (Math.pow(1+data.interest / 100 / 12, data.period) -1);
        }

        result.principal = data.principal;
        result.interestAfterTax = parseint(result.interestBeforeTax * ( 1 - (data.taxType/100)));
        result.interestBeforeTax = parseInt(result.interestBeforeTax)
        result.maturityAmount = data.principal + Math.round(result.interestAfterTax);
        return result;
    }
    // 적금계산
    #saving(data)
    {
        const result = {type: 'saving'};
        const interestRate = parseFloat(data.interest) / 100;
        const taxRate = parseFloat(data.taxType) / 100;

        if (data.interestType === '단리') 
        {
            result.principal = data.principal * data.period;
            result.interestBeforeTax = ((data.principal * data.period * (data.period + 1)) / 2) * (interestRate / 12);
            result.interestAfterTax = interestBeforeTax * (1 - taxRate);
            result.maturityAmount = data.principal + Math.round(result.interestAfterTax);

        } else if (data.interestType === '복리') {
            const monthlyPayment = principal;
            let balance = principal;
            let interestBeforeTax = 0;
        
            for (let i = 0; i < period; i++) {
                balance = balance * (1 + interestRate);
                balance += monthlyPayment;
                interestBeforeTax += balance * interestRate;
            }

            const interestAfterTax = interestBeforeTax * (1 - taxRate);
            const maturityAmount = principal + interestAfterTax;
        
            result.interestBeforeTax = parseInt(interestBeforeTax);
            result.principal = data.principal * data.period;
            result.interestAfterTax = parseInt(interestAfterTax);
            result.maturityAmount = parseInt(maturityAmount);
        }
        return result;
    }

    #loan(data)
    {
        const result = {type:'load'};
        return result;
    }

    #showResult(node, result)
    {
        if(!result) return;
        const form = node.closest('form');
        if(form.name === 'load')
        {

        }
        else
        {
            form.querySelector('.result-principal').innerText = this.#numberWithCommas(result.principal);
            form.querySelector('.result-interest-before-tax').innerText = this.#numberWithCommas(result.interestBeforeTax);
            form.querySelector('.result-interest-after-tax').innerText = this.#numberWithCommas(result.interestAfterTax);
            form.querySelector('.result-maturity-amount').innerText = this.#numberWithCommas(result.maturityAmount);
        }
    }
}