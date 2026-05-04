import React, { Component } from 'react';
const { Parser } = require('expr-eval');

const parser = new Parser({
    operators: {
        add: true,
        concatenate: true,
        conditional: true,
        divide: true,
        factorial: true,
        multiply: true,
        power: true,
        remainder: true,
        subtract: true,
        logical: false,
        comparison: false,
        'in': false,
        assignment: false,
    }
});

export class Calc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expression: '',
            result: '0',
            error: false,
            justEvaluated: false,
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyboard);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyboard);
    }

    handleKeyboard = (e) => {
        const key = e.key;
        if ('0123456789'.includes(key)) { this.appendToExpr(key); return; }
        if ('+-*/%^()'.includes(key)) { this.appendToExpr(key); return; }
        if (key === '.') { this.appendToExpr('.'); return; }
        if (key === 'Enter' || key === '=') { e.preventDefault(); this.evaluate(); return; }
        if (key === 'Backspace') { this.backspace(); return; }
        if (key === 'Escape') { this.clear(); return; }
    }

    appendToExpr = (value) => {
        this.setState(prev => {
            let expr = prev.justEvaluated && /^[+\-*/%^]$/.test(value)
                ? prev.result + value
                : prev.justEvaluated
                    ? value
                    : prev.expression + value;
            return { expression: expr, justEvaluated: false, error: false };
        }, this.liveEvaluate);
    }

    liveEvaluate = () => {
        const { expression } = this.state;
        if (!expression) { this.setState({ result: '0', error: false }); return; }
        try {
            const val = parser.evaluate(expression);
            const formatted = Number.isFinite(val)
                ? parseFloat(val.toFixed(10)).toString()
                : String(val);
            this.setState({ result: formatted, error: false });
        } catch (_) {
            // don't show error while typing
        }
    }

    evaluate = () => {
        const { expression } = this.state;
        if (!expression) return;
        try {
            const val = parser.evaluate(expression);
            const formatted = Number.isFinite(val)
                ? parseFloat(val.toFixed(10)).toString()
                : String(val);
            this.setState({ result: formatted, expression: expression, error: false, justEvaluated: true });
        } catch (e) {
            this.setState({ result: 'Error', error: true, justEvaluated: false });
        }
    }

    clear = () => {
        this.setState({ expression: '', result: '0', error: false, justEvaluated: false });
    }

    backspace = () => {
        this.setState(prev => {
            if (prev.justEvaluated) return { expression: '', result: '0', justEvaluated: false };
            const expr = prev.expression.slice(0, -1);
            return { expression: expr, justEvaluated: false };
        }, this.liveEvaluate);
    }

    negate = () => {
        this.setState(prev => {
            let expr = prev.expression;
            if (!expr) return {};
            if (expr.startsWith('(-') && expr.endsWith(')')) {
                expr = expr.slice(2, -1);
            } else {
                expr = '(-' + expr + ')';
            }
            return { expression: expr, justEvaluated: false };
        }, this.liveEvaluate);
    }

    handleButton = (label) => {
        switch (label) {
            case 'C': return this.clear();
            case 'CE': return this.backspace();
            case '=': return this.evaluate();
            case '+/-': return this.negate();
            case 'x²': return this.appendToExpr('^2');
            case 'xʸ': return this.appendToExpr('^');
            case '!': return this.appendToExpr('!');
            case 'π': return this.appendToExpr('PI');
            case 'e': return this.appendToExpr('E');
            case 'sin': return this.appendToExpr('sin(');
            case 'cos': return this.appendToExpr('cos(');
            case 'tan': return this.appendToExpr('tan(');
            case 'asin': return this.appendToExpr('asin(');
            case 'acos': return this.appendToExpr('acos(');
            case 'atan': return this.appendToExpr('atan(');
            case 'ln': return this.appendToExpr('ln(');
            case 'log': return this.appendToExpr('log10(');
            case '√': return this.appendToExpr('sqrt(');
            default: return this.appendToExpr(label);
        }
    }

    renderButton = (label, extraClasses) => {
        return (
            <button
                key={label}
                onClick={() => this.handleButton(label)}
                className={'flex items-center justify-center rounded-lg text-sm font-semibold cursor-pointer select-none transition-all duration-100 active:scale-95 ' + extraClasses}
                style={{ minHeight: '2.4rem' }}
            >
                {label}
            </button>
        );
    }

    render() {
        const { expression, result, error, justEvaluated } = this.state;

        const num = 'bg-gray-700 hover:bg-gray-600 text-white';
        const op = 'bg-ub-cool-grey hover:bg-gray-500 text-white';
        const fn = 'bg-gray-800 hover:bg-gray-700 text-blue-400 text-xs';
        const accent = 'bg-ub-orange hover:opacity-90 text-white';
        const eq = 'bg-green-700 hover:bg-green-600 text-white';
        const clr = 'bg-red-700 hover:bg-red-600 text-white';

        return (
            <div className="h-full w-full flex flex-col bg-ub-grey text-white select-none overflow-hidden">
                {/* Display */}
                <div className="flex flex-col justify-end px-4 py-3 bg-black bg-opacity-40 border-b border-gray-800" style={{ minHeight: '5.5rem' }}>
                    <div className="text-right text-gray-400 text-xs truncate h-4 mb-1">
                        {justEvaluated ? expression + ' =' : expression || '\u00A0'}
                    </div>
                    <div className={'text-right text-3xl font-light truncate ' + (error ? 'text-red-400' : 'text-white')}>
                        {result}
                    </div>
                </div>

                {/* Buttons grid */}
                <div className="flex-1 grid grid-cols-5 gap-1 p-2">
                    {/* Row 1 – trig */}
                    {this.renderButton('sin', fn)}
                    {this.renderButton('cos', fn)}
                    {this.renderButton('tan', fn)}
                    {this.renderButton('ln', fn)}
                    {this.renderButton('log', fn)}

                    {/* Row 2 – inv trig + roots */}
                    {this.renderButton('asin', fn)}
                    {this.renderButton('acos', fn)}
                    {this.renderButton('atan', fn)}
                    {this.renderButton('√', fn)}
                    {this.renderButton('x²', fn)}

                    {/* Row 3 – constants + power + factorial */}
                    {this.renderButton('π', fn)}
                    {this.renderButton('e', fn)}
                    {this.renderButton('xʸ', op)}
                    {this.renderButton('!', op)}
                    {this.renderButton('%', op)}

                    {/* Row 4 – clear + parens + divide */}
                    {this.renderButton('C', clr)}
                    {this.renderButton('CE', accent)}
                    {this.renderButton('(', op)}
                    {this.renderButton(')', op)}
                    {this.renderButton('/', op)}

                    {/* Row 5 – 7 8 9 * +/- */}
                    {this.renderButton('7', num)}
                    {this.renderButton('8', num)}
                    {this.renderButton('9', num)}
                    {this.renderButton('*', op)}
                    {this.renderButton('+/-', op)}

                    {/* Row 6 – 4 5 6 - */}
                    {this.renderButton('4', num)}
                    {this.renderButton('5', num)}
                    {this.renderButton('6', num)}
                    {this.renderButton('-', op)}
                    <div></div>

                    {/* Row 7 – 1 2 3 + = */}
                    {this.renderButton('1', num)}
                    {this.renderButton('2', num)}
                    {this.renderButton('3', num)}
                    {this.renderButton('+', op)}
                    {this.renderButton('=', eq)}

                    {/* Row 8 – 0 . */}
                    {this.renderButton('0', num + ' col-span-2')}
                    <div></div>
                    {this.renderButton('.', num)}
                    <div></div>
                </div>
            </div>
        );
    }
}

export default Calc

export const displayTerminalCalc = (addFolder, openApp) => {
    return <Calc addFolder={addFolder} openApp={openApp} />;
}
