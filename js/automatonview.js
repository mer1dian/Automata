function NFAView( nfa ) {
    var self = this;
    // state -> state view object
    this.states = {};
    this.transitions = {};
    this.alphabet = {};
    // state object:
    this.nfa = nfa;
    var j = 200;
    for ( var symbol in nfa.alphabet ){
        self.alphabet[ symbol ] = {
            position: new Vector( j, 400 ),
            importance: 'normal',
            zindex: 0,
            symbol: symbol,
        };
        j += 25;
    }
    function stateAdded( state ) {
        self.states[ state ] = {
            position: new Vector( 0, 0 ),
            importance: 'normal',
            zindex: 0,
            state: state
        };
        self.transitions[ state ] = {};
        for ( var sigma in nfa.alphabet ) {
            self.transitions[ state ][ sigma ] = {};
            for ( var to in nfa.transitions[ state ][ sigma ] ) {
                self.transitions[ state ][ sigma ][ to ] = [ {
                    position: new Vector( 0, 0 ),
                    importance: 'normal',
                    detached: false
                } ];
            }
        }
    }
    this.nfa.on( 'stateadded', stateAdded );
    for ( var state in nfa.states ) {
        stateAdded( state );
    }
    this.nfa.on( 'statedeleted', function( state ) {
        delete self.states[ state ];
        delete self.transitions[ state ];
    } );
    this.nfa.on( 'transitionadded', function( from, via, to ) {
        self.transitions[ from ][ via ][ to ] = {
            position: new Vector( 0, 0 ),
            importance: 'normal',
            detached: false
        };
    } );
    this.nfa.on( 'transitiondeleted', function( from, via, to ) {
        self.transitions[ from ][ via ][ to ] = false;
    } );
}