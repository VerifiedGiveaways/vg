import Text "mo:base/Text";
import Int "mo:base/Int";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Utils "./utils";

actor User {
    public shared query ({ caller }) func whoAmI() : async Text {
        Principal.toText(caller)
    };
};
