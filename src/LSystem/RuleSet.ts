class LSystemRule
{
    public Probability : number;
    public Rule : string;

    constructor(rule : string, probability : number)
    {
        this.Probability = probability;
        this.Rule = rule;
    }
}

class RuleSet
{
    private _rules : { [id: string]: LSystemRule[] } = {};

    constructor(rules : { [id: string]: LSystemRule[] })
    {
        this._rules = rules;
    }

    GetRule(key : string) : string
    {
        let random = Math.random();

        if (this._rules[key] == null)
            return key;

        for (let i = 0; i < this._rules[key].length; ++i)
        {
            let ruleProbability = this._rules[key][i].Probability;
            if (ruleProbability < random)
                return this._rules[key][i].Rule;

            random += ruleProbability;
        }

        return "Error";
    }

}