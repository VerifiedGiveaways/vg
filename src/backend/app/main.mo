import Text "mo:base/Text";
import Int "mo:base/Int";

import Utils "./utils";

actor App {
    stable var data : Text = "";

    public shared func setData(value : Text) : async () {
        data := value;
    };

    public shared query func getData(value : Text) : async Text {
        data;
    };

    public shared query func getTime() : async Int {
        Utils.getEpochTime();
    };
};
