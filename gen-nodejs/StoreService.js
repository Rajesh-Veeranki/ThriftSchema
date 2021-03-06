//
// Autogenerated by Thrift Compiler (0.9.1)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var Thrift = require('thrift').Thrift;

var ttypes = require('./user_types');
//HELPER FUNCTIONS AND STRUCTURES

StoreService_store_args = function(args) {
  this.user = null;
  if (args) {
    if (args.user !== undefined) {
      this.user = args.user;
    }
  }
};
StoreService_store_args.prototype = {};
StoreService_store_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.user = new ttypes.User();
        this.user.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

StoreService_store_args.prototype.write = function(output) {
  output.writeStructBegin('StoreService_store_args');
  if (this.user !== null && this.user !== undefined) {
    output.writeFieldBegin('user', Thrift.Type.STRUCT, 1);
    this.user.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

StoreService_store_result = function(args) {
  this.success = null;
  this.err = null;
  if (args instanceof ttypes.InvalidData) {
    this.err = args;
    return;
  }
  if (args) {
    if (args.success !== undefined) {
      this.success = args.success;
    }
    if (args.err !== undefined) {
      this.err = args.err;
    }
  }
};
StoreService_store_result.prototype = {};
StoreService_store_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.I32) {
        this.success = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.err = new ttypes.InvalidData();
        this.err.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

StoreService_store_result.prototype.write = function(output) {
  output.writeStructBegin('StoreService_store_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.I32, 0);
    output.writeI32(this.success);
    output.writeFieldEnd();
  }
  if (this.err !== null && this.err !== undefined) {
    output.writeFieldBegin('err', Thrift.Type.STRUCT, 1);
    this.err.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

StoreServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this.seqid = 0;
    this._reqs = {};
};
StoreServiceClient.prototype = {};
StoreServiceClient.prototype.store = function(user, callback) {
  this.seqid += 1;
  this._reqs[this.seqid] = callback;
  this.send_store(user);
};

StoreServiceClient.prototype.send_store = function(user) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('store', Thrift.MessageType.CALL, this.seqid);
  var args = new StoreService_store_args();
  args.user = user;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

StoreServiceClient.prototype.recv_store = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new StoreService_store_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.err) {
    return callback(result.err);
  }
  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('store failed: unknown result');
};
StoreServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
StoreServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.Exception, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

StoreServiceProcessor.prototype.process_store = function(seqid, input, output) {
  var args = new StoreService_store_args();
  args.read(input);
  input.readMessageEnd();
  this._handler.store(args.user, function (err, result) {
    var result = new StoreService_store_result((err != null ? err : {success: result}));
    output.writeMessageBegin("store", Thrift.MessageType.REPLY, seqid);
    result.write(output);
    output.writeMessageEnd();
    output.flush();
  })
}

