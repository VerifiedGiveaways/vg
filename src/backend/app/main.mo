import Text "mo:base/Text";
import Int "mo:base/Int";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Utils "./utils";

actor App {
    stable var data : Text = "";

    public shared ({ caller }) func setData(value : Text) : async () {
        Debug.print("setData caller");
        Debug.print(Principal.toText(caller));

        data := value;
    };

    public shared query ({ caller }) func getData() : async Text {
        Debug.print("getData caller");
        Debug.print(Principal.toText(caller));

        data;
    };

    public shared query ({ caller }) func getTime() : async Int {
        Debug.print("getTime caller");
        Debug.print(Principal.toText(caller));

        Utils.getEpochTime();
    };

    public shared query ({ caller }) func whoAmI() : async Text {
        Principal.toText(caller)
    };
};
